import Mousetrap from 'mousetrap';

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
	const keyboardShortcuts = {
		'alt+tab': previous,
		end: focusLastItem,
		home: focusFirstItem,
		'shift+tab': previous,
		down: next,
		tab: next,
		up: previous
	};

	// By default, Mousetrap will suppress events while you are focused in an input/textarea etc.
	Mousetrap.stopCallback = function () {
		return false;
	};

	Object.entries(keyboardShortcuts).forEach(([keys, handler]) => {
		Mousetrap.bind(
			keys,
			runInSeries([
				(event: Event) => ({ event, allFocusableItems: [], currentlyFocusedItem: undefined }),
				preventDefault,
				stopPropagation,
				getAllFocusableChildren,
				getCurrentlyFocusedItem,
				handler
			])
		);
	});

	function preventDefault(context: MiddlewareContext): MiddlewareContext {
		context.event.preventDefault();
		return context;
	}

	function stopPropagation(context: MiddlewareContext): MiddlewareContext {
		context.event.stopPropagation();
		return context;
	}

	function getAllFocusableChildren(context: MiddlewareContext): MiddlewareContext {
		const focusables = [...node.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)]; // NodeList to Array

		console.log(focusables);
		return {
			...context,
			allFocusableItems: focusables.filter((element) => elementIsVisible(element))
		};
	}

	function getCurrentlyFocusedItem(context: MiddlewareContext): MiddlewareContext {
		const currentlyFocusedItem = document.activeElement as HTMLElement;

		if (currentlyFocusedItem && !node.contains(currentlyFocusedItem)) {
			console.log('SO.... we got here... how?');
			return context;
		}

		return {
			...context,
			currentlyFocusedItem
		};
	}

	function next({ allFocusableItems, currentlyFocusedItem }: MiddlewareContext): void {
		console.log('NEXT');
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

	function previous({ allFocusableItems, currentlyFocusedItem }: MiddlewareContext): void {
		console.log('PREVIOUS');
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

	function focusFirstItem({ allFocusableItems }: MiddlewareContext) {
		allFocusableItems[0] && allFocusableItems[0].focus();
	}

	function focusLastItem({ allFocusableItems }: MiddlewareContext) {
		allFocusableItems[allFocusableItems.length - 1].focus();
	}

	return {
		destroy() {
			Object.keys(keyboardShortcuts).forEach((key) => Mousetrap.unbind(key));
		}
	};
}
