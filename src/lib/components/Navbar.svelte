<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	export let user;
	export let showDropdownMenu: boolean = false;

	let showDropbox: boolean = false;

	const dispatch = createEventDispatcher();

	const logout = async (e: Event) => {
		e.preventDefault();

		const res = await fetch('/login?/logout', {
			headers: {
				'Content-Type': 'text/plain',
				Acceppt: 'application/json'
			},

			method: 'POST',
			body: JSON.stringify(user)
		});
		console.log(res);
		goto('/login');
	};
</script>

<nav class="navbar">
	<div class="navbar__box">
		<button
			class="navbar__box__dropdown_btn"
			on:click={() => {
				showDropdownMenu = !showDropdownMenu;
				dispatch('switchMenu', { showDropdownMenu });
			}}>|||</button
		>
		<img class="navbar__logo" src="/img/logo-gba2.png" alt="Logo Provincia" />
	</div>
	<button on:click={() => (showDropbox = !showDropbox)} class="userbox">
		<img class="userbox__photo" src="/img/users/default-user2.png" alt="Usuario" />
		{#if showDropbox}
			<div class="userbox__dropbox">
				<span class="userbox__dropbox__name">{user.username}</span>
				<button class="userbox__dropbox__button">Perfil</button>
				{#if user.role === 'ADMIN'}
					<button
						class="userbox__dropbox__button"
						on:click={() => {
							goto('/admin');
						}}>Administracion</button
					>
				{/if}
				<button class="userbox__dropbox__button" on:click={logout}>Salir</button>
			</div>
		{/if}
	</button>
</nav>
