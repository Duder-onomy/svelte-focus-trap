<script lang="ts">
	import focusTrap from '$lib/index';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div use:focusTrap>
  <fieldset>
    <label>All these things are focusable</label>

    <label>
      Label for the input
      <input />
    </label>

    <button>Things</button>

    <button>that can take focus</button>
  </fieldset>
</div>
