<script lang="ts">
	import focusTrap from '$lib/index';

	export let showFormModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showFormModal) dialog.showModal();
</script>

<!-- <style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style> -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showFormModal = false)}
	on:click|self={() => dialog.close()}
	class="relative z-10"
	aria-labelledby="modal-title"
	aria-modal="true"
>
	<div on:click|stopPropagation>
		<!-- Background backdrop, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0" -->

		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

		<div class="fixed inset-0 z-10 overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<!-- Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" -->

				<div
					class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
					use:focusTrap
				>
					<div class="isolate bg-white px-6 py-24 text-center sm:py-32 sm:text-left lg:px-8">
						<div
							class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
							aria-hidden="true"
						>
							<div
								class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
								style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
							/>
						</div>
						<div class="mx-auto max-w-2xl text-center">
							<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								Contact sales
							</h2>
							<p class="mt-2 text-lg leading-8 text-gray-600">
								Aute magna irure deserunt veniam aliqua magna enim voluptate.
							</p>
						</div>
						<form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
							<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
								<div>
									<label
										for="first-name"
										class="block text-sm font-semibold leading-6 text-gray-900">First name</label
									>
									<div class="mt-2.5">
										<input
											type="text"
											name="first-name"
											id="first-name"
											autocomplete="given-name"
											class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div>
									<label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900"
										>Last name</label
									>
									<div class="mt-2.5">
										<input
											type="text"
											name="last-name"
											id="last-name"
											autocomplete="family-name"
											class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div class="sm:col-span-2">
									<label for="company" class="block text-sm font-semibold leading-6 text-gray-900"
										>Company</label
									>
									<div class="mt-2.5">
										<input
											type="text"
											name="company"
											id="company"
											autocomplete="organization"
											class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div class="sm:col-span-2">
									<label for="email" class="block text-sm font-semibold leading-6 text-gray-900"
										>Email</label
									>
									<div class="mt-2.5">
										<input
											type="email"
											name="email"
											id="email"
											autocomplete="email"
											class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div class="sm:col-span-2">
									<label
										for="phone-number"
										class="block text-sm font-semibold leading-6 text-gray-900">Phone number</label
									>
									<div class="relative mt-2.5">
										<div class="absolute inset-y-0 left-0 flex items-center">
											<label for="country" class="sr-only">Country</label>
											<select
												id="country"
												name="country"
												class="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
											>
												<option>US</option>
												<option>CA</option>
												<option>EU</option>
											</select>
											<svg
												class="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
										<input
											type="tel"
											name="phone-number"
											id="phone-number"
											autocomplete="tel"
											class="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div class="sm:col-span-2">
									<label for="message" class="block text-sm font-semibold leading-6 text-gray-900"
										>Message</label
									>
									<div class="mt-2.5">
										<textarea
											name="message"
											id="message"
											rows="4"
											class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								<div class="flex gap-x-4 sm:col-span-2">
									<div class="flex h-6 items-center">
										<!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
										<button
											type="button"
											class="flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											role="switch"
											aria-checked="false"
											aria-labelledby="switch-1-label"
										>
											<span class="sr-only">Agree to policies</span>
											<!-- Enabled: "translate-x-3.5", Not Enabled: "translate-x-0" -->
											<span
												aria-hidden="true"
												class="h-4 w-4 translate-x-0 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
											/>
										</button>
									</div>
									<label class="text-sm leading-6 text-gray-600" id="switch-1-label">
										By selecting this, you agree to our
										<a href="#" class="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
									</label>
								</div>
							</div>
							<div class="mt-10">
								<button
									type="submit"
									class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									on:click={() => {
										dialog?.close();
									}}
								>
									Let's talk
								</button>
							</div>
						</form>
					</div>
					<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button
							type="button"
							class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
							on:click={() => {
								dialog?.close();
							}}>Deactivate</button
						>
						<button
							type="button"
							class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							on:click={() => {
								dialog?.close();
							}}>Cancel</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</dialog>
