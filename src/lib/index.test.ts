import { describe, it, expect } from 'vitest';
import focusTrap from './index.js';

describe('Focustrap Svelte Directive', () => {
	it('does nothing if not passed a element', () => {
		expect(focusTrap()).to.be.undefined;
	});

	it('returns an object with a destroy method', () => {
		const element = document.createElement('div');
		expect(focusTrap(element)).toHaveProperty('destroy');
	});
});
