<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import DropdownMenu from '$lib/components/DropdownMenu.svelte';

	export let data: LayoutData;
	let showDropdownMenu: boolean = false;
	const user = JSON.parse(data.user);

	const switchMenu = (e: CustomEvent) => {
		showDropdownMenu = e.detail.showDropdownMenu;
	};
</script>

<DropdownMenu show={showDropdownMenu} on:closeMenu={switchMenu} admin={true} />
<section class="layout">
	<slot />
</section>
