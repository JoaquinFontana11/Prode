<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let show: boolean;
	export let admin: boolean = false;

	if (admin) show = true;

	const dispatch = createEventDispatcher();
</script>

{#if show}
	<aside class="dropdown_menu" class:between={admin} transition:slide={{ axis: 'x' }}>
		{#if admin}
			<div class="flex-col">
				<a href="/admin/users">Usuarios</a>
				<a href="/admin/tournaments">Torneos</a>
				<a href="/admin/matches">Partidos</a>
				<a href="/admin/countries">Paises</a>
				<a href="/admin/teams">Equipos</a>
			</div>
			<a href="/">Salir</a>
		{:else}
			<button
				class="dropdown_menu__closebtn"
				on:click={() => {
					show = false;
					dispatch('closeMenu', { show });
				}}>X</button
			>
			<p>hola perdida</p>
		{/if}
	</aside>
{/if}
