<script>
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import bash from 'svelte-highlight/languages/bash';
	import javascript from 'svelte-highlight/languages/javascript';
	import github from 'svelte-highlight/styles/github';
	import FormInModal from './components/FormInModal.svelte';
	import SidebarWithMixedElements from './components/SidebarWithMixedElements.svelte';
	import GridofImagesModal from './components/GridOfImagesModal.svelte';

	const installExample = `npm install -D svelte-focus-trap`;
	const useageExample = `
    <script>
      import { focusTrap } from 'svelte-focus-trap';
    <script>

    {#if showing}
      <div use:focusTrap>
        <!-- ...modal contents -->
      </div>
    {/if}
  `;
	const focusableSelector = `
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
  `;
	const elementIsVisibleFunction = `
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
  `;

	let showFormModal = false;
	let showSidebarWithMixedElements = false;
	let showGridOfImagesModal = false;
</script>

<svelte:head>
	{@html github}
</svelte:head>

<div class="bg-white py-24 sm:py-32" id="about-anchor-link">
	<div class="mx-auto max-w-2xl lg:mx-0">
		<p class="text-base font-semibold leading-7 text-indigo-600">
			<a href="https://github.com/Duder-onomy/svelte-focus-trap"
				>https://github.com/Duder-onomy/svelte-focus-trap</a
			>
		</p>
		<h2 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
			svelte-focus-trap
		</h2>
	</div>
</div>

<div class="prose">
	<p>A svelte directive that will trap and wrap focus within an element.</p>
	<p>
		You can navigate child focusable elements with up, down, tab, shift + tab, alt + tab. I have
		attempted to match the accessibility best practices listed
		<a
			href="https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html"
			target="_blank">here on "w3.org".</a
		>.
	</p>
	<p>
		This could be useful if you wanted to trap focus within something like a modal. When you
		gotta... focus-trap and focus-wrap.
	</p>
	<ul>
		<li>Does not auto focus the first item. TODO: Link to a svelte auto-focus directive.</li>
		<li>
			When pressing `down` or `tab`:
			<ol>
				<li>When the known focusables are not focused, gives focus to the first item.</li>
				<li>If focus is on the last known focusable, it gives focus to the first item.</li>
				<li>Gives focus to the next item.</li>
			</ol>
		</li>
		<li>
			When pressing `up` or `shift+tab` or `alt+tab`:
			<ol>
				<li>When the known focusables are not focused, gives focus to the last item.</li>
				<li>If focus is on the first known focuable, it gives focus to the last item.</li>
				<li>Gives focus to the previous item.</li>
			</ol>
		</li>
		<li>
			When pressing `home`:
			<ol>
				<li>Gives focus to the first item.</li>
			</ol>
		</li>
		<li>
			When pressing `end`:
			<ol>
				<li>Gives focus to the last item.</li>
			</ol>
		</li>
		<li>Attempts to skip hidden items and items with display none of tabindex="-1"</li>
	</ul>

	<h2 id="installation-anchor-link">Installation</h2>

	<p>
		<Highlight language={bash} code={installExample} />
	</p>

	<h2 id="useage-anchor-link">Useage</h2>

	<p>
		<HighlightSvelte code={useageExample} />
	</p>

	<h2 id="what-gets-focus-anchor-link">What gets selected for focus?</h2>

	<p>
		In addition to selecting anything that matches the following CSS selector, we will also skip the
		element if it is not visible, as determined by the following `elementIsVisible` method.

		<Highlight language={javascript} code={focusableSelector} />

		<Highlight language={javascript} code={elementIsVisibleFunction} />
	</p>

	<h2 id="examples-anchor-link">Examples</h2>

	<ul>
		<li><button on:click={() => (showFormModal = true)}>Modal with form elements</button></li>

		<li>
			<button on:click={() => (showSidebarWithMixedElements = true)}
				>Sidebar dialog with mixed interactible elements</button
			>
		</li>

		<li><button on:click={() => (showGridOfImagesModal = true)}>Grid of images</button></li>
	</ul>
</div>

<FormInModal bind:showFormModal />

<SidebarWithMixedElements bind:showSidebarWithMixedElements />

<GridofImagesModal bind:showGridOfImagesModal />
