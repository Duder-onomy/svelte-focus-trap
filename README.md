# svelte-focus-trap

![npm](https://img.shields.io/npm/v/svelte-focus-trap)

A svelte directive that will trap focus within an element.
You can navigate child focusable elements with up, down, tab, shift + tab, alt + tab. I have attempted to match the accessibility best practices listed [here](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).

This could be useful if you wanted to trap focus within something like a modal. When you gotta... focus-trap and focus-wrap.

- Does not auto focus the first item.
  <!-- TODO: ? WTH is this Ember link doing here? Surely svelte has an auto/capture focus directive * Scope this [auto-focus modifier](https://github.com/qonto/ember-autofocus-modifier) out if you need that. -->
- When pressing `down` or `tab`:
  - When the known focusables are not focused, gives focus to the first item.
  - If focus is on the last known focusable, it gives focus to the first item.
  - Gives focus to the next item.
- When pressing `up` or `shift+tab` or `alt+tab`:
  - When the known focusables are not focused, gives focus to the last item.
  - If focus is on the first known focuable, it gives focus to the last item.
  - Gives focus to the previous item.
- When pressing `home`:
  - Gives focus to the first item.
- When pressing `end`:
  - Gives focus to the last item.
- Attempts to skip hidden items and items with display none of tabindex="-1".

## Installation

```
npm install --save-dev svelte-focus-trap
```

## Usage

```html
<script>
	import { focusTrap } from 'svelte-focus-trap';
</script>

{#if showing}
<div use:focusTrap>
	<!-- ...modal contents -->
</div>
{/if}
```

## What gets selected?

In addition to selecting anything that matches THIS CSS SELECTOR, we will also skip the element if it is not visible, as determined by THIS method.

## License

This project is licensed under the [MIT License](LICENSE.md).

--

# Everything here is from the sveltekit library generator.

---

Everything you need to build a Svelte library, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Read more about creating a library [in the docs](https://kit.svelte.dev/docs/packaging).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

Go into the `package.json` and give your package the desired name through the `"name"` option. Also consider adding a `"license"` field and point it to a `LICENSE` file which you can create from a template (one popular option is the [MIT license](https://opensource.org/license/mit/)).

To publish your library to [npm](https://www.npmjs.com):

```bash
npm publish
```
