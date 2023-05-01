import FocusTrap from './FocusTrap.js';

export default function focusTrap(node: HTMLElement) {
	if (!node) return;
	if (!window) return;

	const focusTrap = new FocusTrap(node);

	return {
		destroy() {
			focusTrap.destroy();
		}
	};
}
