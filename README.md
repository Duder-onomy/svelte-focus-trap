# svelte-focus-trap

![npm](https://img.shields.io/npm/v/svelte-focus-trap)

A svelte directive that will trap focus within an element.
You can navigate child focusable elements with up, down, tab, shift + tab, alt + tab. I have attempted to match the accesibility best practices listed [here](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).

This could be useful if you wanted to trap focus within something like a modal. When you gotta... focus-trap and focus-wrap.

* Does not auto focus the first item.
  <!-- * Scope this [auto-focus modifier](https://github.com/qonto/ember-autofocus-modifier) out if you need that. -->
* When pressing `down` or `tab`:
  * When the known focusables are not focused, gives focus to the first item.
  * If focus is on the last known focusable, it gives focus to the first item.
  * Gives focus to the next item.
* When pressing `up` or `shift+tab` or `alt+tab`:
  * When the known focusables are not focused, gives focus to the last item.
  * If focus is on the first known focuable, it gives focus to the last item.
  * Gives focus to the previous item.
* When pressing `home`:
  * Gives focus to the first item.
* When pressing `end`:
  * Gives focus to the last item.
* Attempts to skip hidden items and items with display none of tabindex="-1".


Todos:
- [ ] Demo
- [ ] Tests + Ci

Installation
------------------------------------------------------------------------------

```
npm install --save-dev svelte-focus-trap
```

Usage
------------------------------------------------------------------------------

```html
<script>
  import { focusTrap } from 'svelte-focus-trap'
</script>

{#if showing}
  <div
    use:focusTrap
  > 
    <!-- ...modal contents -->
  </div>
{/if}
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
