<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import AdminCreateButton from '$lib/components/admin/AdminCreateButton.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;
	const tournaments = data.tournaments;
	const headers = ['Nombre', 'Activo'];
	const attributes = ['name', 'active'];

	const modifyTournament = (e: CustomEvent) => {
		goto(`/admin/tournaments/${e.detail.id}`);
	};

	const deleteTournament = async (e: CustomEvent) => {
		const res = await fetch(`tournaments/${e.detail.id}?/delete`, {
			method: 'POST',
			body: new FormData()
		});
		if (res.status === 200) {
			toast.success('Se elimino el torneo');
			setTimeout(() => {
				location.reload();
			}, 1000);
		} else {
			toast.error('Ocurrio un error con el servidor');
		}
	};
</script>

<Toaster />

<section class="layout">
	<AdminCreateButton tableName="tournaments" />
	<TableData
		{headers}
		{attributes}
		data={tournaments.map((tournament) => ({
			id: tournament.id,
			name: tournament.name,
			active: tournament.active
		}))}
		filterConfig={{ show: true, placeholder: 'Buscar un Torneo' }}
		on:delete-doc={deleteTournament}
		on:modify-doc={modifyTournament}
		caption="Torneos"
	/>
</section>
