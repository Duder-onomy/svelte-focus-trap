// @vitest-environment edge-runtime

import { describe, it, expect } from 'vitest';
import focusTrap from '$lib/index.js';

describe('Focustrap Svelte Directive | SSR Support', () => {
	it('does nothing if there is no window (SSR Support)', () => {
		expect(focusTrap('something')).to.be.undefined;
	});
});
