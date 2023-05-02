import { describe, it, expect, beforeEach } from 'vitest';
import FocusTrap from '$lib/FocusTrap.js';

describe('FocusTrap Class', () => {
	beforeEach(async () => {
		const wrapper = document.createElement('div');

		wrapper.id = 'element-to-test';

		const focusableButton = document.createElement('button');
		focusableButton.dataset.selector = 'first-button';
		focusableButton.dataset.order = 'first';
		wrapper.appendChild(focusableButton);

		const focusableInput = document.createElement('input');
		focusableInput.dataset.selector = 'first-input';
		focusableButton.dataset.order = 'second';
		wrapper.appendChild(focusableInput);

		const focusableAnchor = document.createElement('a');
		focusableAnchor.dataset.selector = 'first-anchor';
		focusableButton.dataset.order = 'third';
		wrapper.appendChild(focusableAnchor);

		document.body.appendChild(wrapper);
	});

	it('does not focus anything by default', () => {
		const element = document.querySelector('#element-to-test');
		new FocusTrap(element as HTMLElement);

		expect(element?.contains(document.activeElement)).to.be.false;
	});

	it('after the first click, gives focus to the first focusable', () => {
		const element = document.querySelector('#element-to-test');
		new FocusTrap(element as HTMLElement);

		expect(element?.contains(document.activeElement)).to.be.false;

		const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab' });
		window.dispatchEvent(shiftTabKeyEvent);

		expect(element?.contains(document.activeElement)).to.be.true;
		expect(
			document.activeElement?.isSameNode(document.querySelector('[data-selector="first-button"]'))
		);
	});

	it('if focus starts inside, the next movement works as expected', () => {
		(document.querySelector('[data-selector="first-input"]') as HTMLInputElement).focus();

		const element = document.querySelector('#element-to-test');
		new FocusTrap(element as HTMLElement);

		expect(element?.contains(document.activeElement)).to.be.true;

		const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab' });
		window.dispatchEvent(shiftTabKeyEvent);

		expect(
			document.activeElement?.isSameNode(document.querySelector('[data-selector="first-anchor"]'))
		);
	});

	it('wraps focus at the beginning and end', () => {
		const element = document.querySelector('#element-to-test');
		new FocusTrap(element as HTMLElement);

		const tabKeyEvent = new KeyboardEvent('keydown', { key: 'tab' });
		window.dispatchEvent(tabKeyEvent);

		expect(
			document.activeElement?.isSameNode(document.querySelector('[data-selector="first-button"]'))
		);

		window.dispatchEvent(tabKeyEvent);

		expect(
			document.activeElement?.isSameNode(document.querySelector('[data-selector="first-input"]'))
		);

		window.dispatchEvent(tabKeyEvent);

		expect(
			document.activeElement?.isSameNode(document.querySelector('[data-selector="first-anchor"]'))
		);

		window.dispatchEvent(tabKeyEvent);

		expect(
			document.activeElement?.isSameNode(document.querySelector('[data-selector="first-button"]'))
		);

		const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', shiftKey: true });
		window.dispatchEvent(shiftTabKeyEvent);

		expect(
			document.activeElement?.isSameNode(document.querySelector('[data-selector="first-anchor"]'))
		);
	});

	describe('focusable elements', () => {
		beforeEach(() => {
			const focusableElement = document.querySelector('#focusable-elements');
			focusableElement?.parentElement?.removeChild(focusableElement);
		});

		function _setup(element: HTMLElement) {
			const wrapper = document.createElement('div');
			wrapper.id = 'focusable-elements';

			document.body.appendChild(wrapper);

			wrapper.appendChild(element);

			const trapElement = document.querySelector('#focusable-elements');
			const focusTrap = new FocusTrap(trapElement as HTMLElement);

			const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', shiftKey: true });

			return focusTrap['getAllFocusableChildren']({
				allFocusableItems: [],
				currentlyFocusedItem: undefined,
				event: shiftTabKeyEvent
			});
		}

		function assertSelected(element: HTMLElement) {
			const context = _setup(element);

			expect(context.allFocusableItems.some((result) => result.isSameNode(element))).to.be.true;
		}

		function assertNotSelected(element: HTMLElement) {
			const context = _setup(element);

			expect(context.allFocusableItems.some((result) => result.isSameNode(element))).to.be.false;
		}

		describe('buttons', () => {
			it('simple button', () => {
				const button = document.createElement('button');
				assertSelected(button);
			});

			it('disabled button', () => {
				const button = document.createElement('button');
				button.disabled = true;
				assertNotSelected(button);
			});

			it('aria-hidden button', () => {
				const button = document.createElement('button');
				button.setAttribute('aria-hidden', 'true');
				assertNotSelected(button);
			});
		});

		describe('inputs', () => {
			it('simple input', () => {
				const input = document.createElement('input');
				assertSelected(input);
			});

			it('disabled input', () => {
				const input = document.createElement('input');
				input.disabled = true;
				assertNotSelected(input);
			});

			it('type=hidden input', () => {
				const input = document.createElement('input');
				input.setAttribute('type', 'hidden');
				assertNotSelected(input);
			});

			it('aria-hidden input', () => {
				const input = document.createElement('input');
				input.setAttribute('aria-hidden', 'true');
				assertNotSelected(input);
			});
		});

		describe('anchors', () => {
			it('with href', () => {
				const element = document.createElement('a');
				element.href = '/bingo';
				assertSelected(element);
			});

			it('without href', () => {
				const element = document.createElement('a');
				assertNotSelected(element);
			});
		});

		describe('selects', () => {
			it('simple select', () => {
				const element = document.createElement('select');
				assertSelected(element);
			});

			it('disabled select', () => {
				const element = document.createElement('select');
				element.disabled = true;
				assertNotSelected(element);
			});

			it('aria-hidden select', () => {
				const element = document.createElement('select');
				element.setAttribute('aria-hidden', 'true');
				assertNotSelected(element);
			});
		});

		describe('area', () => {
			it('with href', () => {
				const element = document.createElement('area');
				element.href = '/bingo';
				assertSelected(element);
			});

			it('without href', () => {
				const element = document.createElement('area');
				assertNotSelected(element);
			});
		});

		describe('textarea', () => {
			it('simple textarea', () => {
				const element = document.createElement('textarea');
				assertSelected(element);
			});

			it('disabled textarea', () => {
				const element = document.createElement('textarea');
				element.disabled = true;
				assertNotSelected(element);
			});

			it('aria-hidden textarea', () => {
				const element = document.createElement('textarea');
				element.setAttribute('aria-hidden', 'true');
				assertNotSelected(element);
			});
		});

		describe('iframe', () => {
			it('simple iframe', () => {
				const element = document.createElement('iframe');
				assertSelected(element);
			});
		});

		describe('object', () => {
			it('simple object', () => {
				const element = document.createElement('object');
				assertSelected(element);
			});
		});

		describe('embed', () => {
			it('simple embed', () => {
				const element = document.createElement('embed');
				assertSelected(element);
			});
		});

		describe('contenteditable', () => {
			it('simple contenteditable', () => {
				const element = document.createElement('div');
				element.setAttribute('contenteditable', true);
				assertSelected(element);
			});
		});

		describe('tabindex', () => {
			it('positive', () => {
				const element = document.createElement('div');
				element.tabIndex = 1;
				assertSelected(element);
			});

			it('negative', () => {
				const element = document.createElement('div');
				element.tabIndex = -1;
				assertNotSelected(element);
			});
		});

		describe('ignores elements that are not visible', () => {
			it('display: none', () => {
				const element = document.createElement('div');
				element.style.display = 'none';
				assertNotSelected(element);
			});

			it('visibility: hidden', () => {
				const element = document.createElement('div');
				element.style.visibility = 'hidden';
				assertNotSelected(element);
			});
		});
	});

	describe('keys', () => {
		it('tab, goes to the next focusable', () => {
			(document.querySelector('[data-order="first"]') as HTMLButtonElement)?.focus();

			const element = document.querySelector('#element-to-test');
			new FocusTrap(element as HTMLElement);

			const tabKeyEvent = new KeyboardEvent('keydown', { key: 'tab' });
			window.dispatchEvent(tabKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="second"]')));

			window.dispatchEvent(tabKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-selector="third"]')));

			window.dispatchEvent(tabKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="first"]')));
		});

		it('alt+tab, goes to the previous focusable', () => {
			(document.querySelector('[data-order="first"]') as HTMLButtonElement)?.focus();

			const element = document.querySelector('#element-to-test');
			new FocusTrap(element as HTMLElement);

			const altTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', altKey: true });
			window.dispatchEvent(altTabKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="third"]')));

			window.dispatchEvent(altTabKeyEvent);

			expect(
				document.activeElement?.isSameNode(document.querySelector('[data-selector="second"]'))
			);

			window.dispatchEvent(altTabKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="first"]')));
		});

		it('shift+tab, goes to the previous focusable', () => {
			const element = document.querySelector('#element-to-test');
			new FocusTrap(element as HTMLElement);

			(document.querySelector('[data-order="first"]') as HTMLButtonElement)?.focus();

			const shiftTabKeyEvent = new KeyboardEvent('keydown', { key: 'tab', shiftKey: true });
			window.dispatchEvent(shiftTabKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="third"]')));

			window.dispatchEvent(shiftTabKeyEvent);

			expect(
				document.activeElement?.isSameNode(document.querySelector('[data-selector="second"]'))
			);

			window.dispatchEvent(shiftTabKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="first"]')));
		});

		it('end, goes to the last focusable', () => {
			const element = document.querySelector('#element-to-test');
			new FocusTrap(element as HTMLElement);

			(document.querySelector('[data-order="first"]') as HTMLButtonElement)?.focus();

			const endKeyEvent = new KeyboardEvent('keydown', { key: 'end' });
			window.dispatchEvent(endKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="third"]')));
		});

		it('home, goes to the first focusable', () => {
			const element = document.querySelector('#element-to-test');
			new FocusTrap(element as HTMLElement);

			(document.querySelector('[data-order="third"]') as HTMLButtonElement)?.focus();

			const endKeyEvent = new KeyboardEvent('keydown', { key: 'home' });
			window.dispatchEvent(endKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="first"]')));
		});

		it('arrowup, goes to the next focusable', () => {
			const element = document.querySelector('#element-to-test');
			new FocusTrap(element as HTMLElement);

			(document.querySelector('[data-order="first"]') as HTMLButtonElement)?.focus();

			const arrowUpKeyEvent = new KeyboardEvent('keydown', { key: 'arrowup' });
			window.dispatchEvent(arrowUpKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="third"]')));

			window.dispatchEvent(arrowUpKeyEvent);

			expect(
				document.activeElement?.isSameNode(document.querySelector('[data-selector="second"]'))
			);

			window.dispatchEvent(arrowUpKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="first"]')));
		});

		it('arrowdown, goes to the previous focusable', () => {
			(document.querySelector('[data-order="first"]') as HTMLButtonElement)?.focus();

			const element = document.querySelector('#element-to-test');
			new FocusTrap(element as HTMLElement);

			const arrowDownKeyEvent = new KeyboardEvent('keydown', { key: 'arrowdown' });
			window.dispatchEvent(arrowDownKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="second"]')));

			window.dispatchEvent(arrowDownKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-selector="third"]')));

			window.dispatchEvent(arrowDownKeyEvent);

			expect(document.activeElement?.isSameNode(document.querySelector('[data-order="first"]')));
		});
	});
});
