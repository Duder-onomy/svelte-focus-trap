<script>
	import '../app.css';
	import AboutIcon from './components/icons/About.svelte';
	import WrenchScrewdriverIcon from './components/icons/WrenchScrewdriver.svelte';
	import CusorArrowRippleIcon from './components/icons/CusorArrowRipple.svelte';
	import MagnifyingGlassIcon from './components/icons/MagnifyingGlass.svelte';
	import LightBulbIcon from './components/icons/LightBulb.svelte';
	import GithubIcon from './components/icons/Github.svelte';
	import SvelteIcon from './components/icons/Svelte.svelte';
	import TailwindIcon from './components/icons/Tailwind.svelte';

	const sidebarLinks = [
		{
			text: 'About',
			icon: AboutIcon,
			link: '#about-anchor-link'
		},
		{
			text: 'Installation',
			icon: WrenchScrewdriverIcon,
			link: '#installation-anchor-link'
		},
		{
			text: 'Useage',
			icon: CusorArrowRippleIcon,
			link: '#useage-anchor-link'
		},
		{
			text: 'What gets focus?',
			icon: MagnifyingGlassIcon,
			link: '#what-gets-focus-anchor-link'
		},
		{
			text: 'Examples',
			icon: LightBulbIcon,
			link: '#examples-anchor-link'
		}
	];

	const externalLinks = [
		{
			text: 'Github',
			icon: GithubIcon,
			link: 'https://github.com/Duder-onomy/svelte-focus-trap'
		},
		{
			text: 'Sveltekit',
			icon: SvelteIcon,
			link: 'https://kit.svelte.dev/'
		},
		{
			text: 'Tailwind UI',
			icon: TailwindIcon,
			link: 'https://tailwindui.com/'
		}
	];
</script>

<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
		<!--
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
		<div class="fixed inset-0 bg-gray-900/80" />

		<div class="fixed inset-0 flex">
			<!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
			<div class="relative mr-16 flex w-full max-w-xs flex-1">
				<!--
          Close button, show/hide based on off-canvas menu state.

          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
				<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
					<button type="button" class="-m-2.5 p-2.5">
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
					<div class="flex h-16 shrink-0 items-center">
						<img
							class="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="Your Company"
						/>
					</div>
					<nav class="flex flex-1 flex-col">
						<ul class="flex flex-1 flex-col gap-y-7">
							<li>
								<ul class="-mx-2 space-y-1">
									{#each sidebarLinks as sidebarLink}
										<!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
										<li>
											<a
												href={sidebarLink.link}
												class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
											>
												<div class="shrink-0 text-gray-400 group-hover:text-indigo-600">
													<svelte:component this={sidebarLink.icon} />
												</div>
												{sidebarLink.text}
											</a>
										</li>
									{/each}
								</ul>
							</li>
							<li>
								<div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
								<ul class="-mx-2 mt-2 space-y-1">
									{#each externalLinks as externalLink}
										<li>
											<a
												href={externalLink.link}
												class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
											>
												<span
													class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600"
												>
													<svelte:component this={externalLink.icon} />
												</span>
												<span class="truncate">{externalLink.text}</span>
											</a>
										</li>
									{/each}
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
			<div class="flex h-16 shrink-0 items-center">
				<img
					class="h-8 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
			</div>
			<nav class="flex flex-1 flex-col">
				<ul class="flex flex-1 flex-col gap-y-7">
					<li>
						<ul class="-mx-2 space-y-1">
							{#each sidebarLinks as sidebarLink}
								<li>
									<!-- Current: "bg-gray-50 text-indigo-600", Default: "text-gray-700 hover:text-indigo-600 hover:bg-gray-50" -->
									<a
										href={sidebarLink.link}
										class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
									>
										<div class="shrink-0 text-gray-400 group-hover:text-indigo-600">
											<svelte:component this={sidebarLink.icon} />
										</div>
										{sidebarLink.text}
									</a>
								</li>
							{/each}
						</ul>
					</li>
					<li>
						<div class="text-xs font-semibold leading-6 text-gray-400">Built with:</div>
						<ul class="-mx-2 mt-2 space-y-1">
							{#each externalLinks as externalLink}
								<li>
									<a
										href={externalLink.link}
										target="_blank"
										class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
									>
										<span
											class="flex h-6 w-6 shrink-0 items-center justify-center bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600"
										>
											<svelte:component this={externalLink.icon} />
										</span>

										<span class="truncate">{externalLink.text}</span>
									</a>
								</li>
							{/each}
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div
		class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
	>
		<button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
			<span class="sr-only">Open sidebar</span>
			<svg
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
		<div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
		<!-- <a href="#">
			<span class="sr-only">Your profile</span>
			<img
				class="h-8 w-8 rounded-full bg-gray-50"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt=""
			/>
		</a> -->
	</div>

	<main class="py-10 lg:pl-72">
		<div class="px-4 sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>
</div>
