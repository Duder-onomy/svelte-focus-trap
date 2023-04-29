import bind from 'bind-decorator';

interface MiddlewareContext {
	event: Event;
	allFocusableItems: HTMLElement[];
	currentlyFocusedItem: HTMLElement | undefined;
}

function runInSeries(
	tasks: (
		| ((args0: Event) => MiddlewareContext)
		| ((arg0: MiddlewareContext) => MiddlewareContext)
		| ((arg0: MiddlewareContext) => void)
	)[]
): () => void {
	return (...initialArgs: unknown[]) => {
		return tasks.reduce((memo, task) => (memo = [...[task(...memo)]]), initialArgs || []);
	};
}

function elementIsVisible(element: HTMLElement): boolean {
	const computedStyle = document?.defaultView?.getComputedStyle(element, null);

	if (computedStyle) {
		return (
			computedStyle.getPropertyValue('display') !== 'none' &&
			computedStyle.getPropertyValue('visibility') !== 'hidden'
		);
	}

	return false;
}

// A list of selectors to select all known focusable elements
const FOCUSABLE_ELEMENTS = [
	'a[href]',
	'area[href]',
	'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
	'select:not([disabled]):not([aria-hidden])',
	'textarea:not([disabled]):not([aria-hidden])',
	'button:not([disabled]):not([aria-hidden])',
	'iframe',
	'object',
	'embed',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])'
].join(',');

export default function focusTrap(node: HTMLElement) {
	const focusTrap = new FocusTrap(node);

	return {
		destroy() {
			focusTrap.destroy();
		}
	};
}

class FocusTrap {
	_hotkeyManager;
	_node;

	keyboardShortcuts = {
		'alt+tab': this.wrapContext(this.previous),
		end: this.wrapContext(this.focusLastItem),
		home: this.wrapContext(this.focusFirstItem),
		'shift+tab': this.wrapContext(this.previous),
		tab: this.wrapContext(this.next),
		arrowdown: this.wrapContext(this.next),
		arrowup: this.wrapContext(this.previous)
	};

	constructor(node: HTMLElement) {
		this._node = node;
		this._hotkeyManager = new HotkeyManager(node, this.keyboardShortcuts);
	}

	@bind
	private wrapContext(handler: (arg0: MiddlewareContext) => void) {
		return runInSeries([
			(event: Event) => ({ event, allFocusableItems: [], currentlyFocusedItem: undefined }),
			this.preventDefault,
			this.stopPropagation,
			this.getAllFocusableChildren,
			this.getCurrentlyFocusedItem,
			handler
		]);
	}

	@bind
	private preventDefault(context: MiddlewareContext): MiddlewareContext {
		context.event.preventDefault();
		return context;
	}

	@bind
	private stopPropagation(context: MiddlewareContext): MiddlewareContext {
		context.event.stopPropagation();
		return context;
	}

	@bind
	private getAllFocusableChildren(context: MiddlewareContext): MiddlewareContext {
		const focusables = [...this._node.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)]; // NodeList to Array

		return {
			...context,
			allFocusableItems: focusables.filter((element) => elementIsVisible(element))
		};
	}

	@bind
	private getCurrentlyFocusedItem(context: MiddlewareContext): MiddlewareContext {
		const currentlyFocusedItem = document.activeElement as HTMLElement;

		if (currentlyFocusedItem && !this._node.contains(currentlyFocusedItem)) {
			return context;
		}

		return {
			...context,
			currentlyFocusedItem
		};
	}

	next({ allFocusableItems, currentlyFocusedItem }: MiddlewareContext): void {
		// if focus is not within the focusables, focus the first one.
		if (!currentlyFocusedItem) {
			allFocusableItems[0] && allFocusableItems[0].focus();
			return;
		}

		const currentlyFocusedIndex = allFocusableItems.indexOf(currentlyFocusedItem);

		// If we have focus on the last one, give focus on the first.
		if (allFocusableItems.length - 1 === currentlyFocusedIndex) {
			allFocusableItems[0] && allFocusableItems[0].focus();
			return;
		}

		// Focus the next one.
		allFocusableItems[currentlyFocusedIndex + 1] &&
			allFocusableItems[currentlyFocusedIndex + 1].focus();
	}

	previous({ allFocusableItems, currentlyFocusedItem }: MiddlewareContext): void {
		// If focus is not within the focusables, focus the last one
		if (!currentlyFocusedItem) {
			allFocusableItems[allFocusableItems.length - 1].focus();
			return;
		}

		const currentlyFocusedIndex = allFocusableItems.indexOf(currentlyFocusedItem);

		// If we have focus on the first one, wrap to the end one.
		if (currentlyFocusedIndex === 0) {
			allFocusableItems[allFocusableItems.length - 1] &&
				allFocusableItems[allFocusableItems.length - 1].focus();
			return;
		}

		// Focus the previous one.
		allFocusableItems[currentlyFocusedIndex - 1] &&
			allFocusableItems[currentlyFocusedIndex - 1].focus();
	}

	focusFirstItem({ allFocusableItems }: MiddlewareContext) {
		allFocusableItems[0] && allFocusableItems[0].focus();
	}

	focusLastItem({ allFocusableItems }: MiddlewareContext) {
		allFocusableItems[allFocusableItems.length - 1].focus();
	}

	destroy() {
		this._hotkeyManager.destroy();
	}
}

class HotkeyManager {
	_node;
	_hotkeyMap;

	constructor(node: HTMLElement, hotkeyMap: { [key: string]: (arg0: KeyboardEvent) => void }) {
		this._node = node;
		this._hotkeyMap = Object.entries(hotkeyMap)
			.map(([hotkey, handler]) => {
				const [modifier, key] = hotkey.split('+');

				return {
					modifier: key && modifier,
					key: key ? key : modifier,
					handler
				};
			})
			.sort((a, b) => {
				if (a.modifier && b.modifier && a.key === b.key) {
					return a.modifier.localeCompare(b.modifier);
				}

				if (a.modifier && !b.modifier && a.key === b.key) {
					return -1;
				}

				if (!a.modifier && b.modifier && a.key === b.key) {
					return 1;
				}

				if (!a.modifier && !b.modifier) {
					return a.key.localeCompare(b.key);
				}

				return 1;
			});

		this.setup();
	}

	@bind
	private setup() {
		document.addEventListener('keydown', this.handler);
	}

	@bind
	public destroy() {
		document.removeEventListener('keydown', this.handler);
	}

	@bind
	private handler(e: KeyboardEvent) {
		this._hotkeyMap.every(({ key, modifier, handler }) => {
			if (e.key.toLowerCase() === key) {
				if (modifier) {
					if (modifier === 'shift' && e.shiftKey) {
						handler(e);
						return false;
					}
					return true;
				} else {
					handler(e);
					return false;
				}
			}
			return true;
		});
	}
}
