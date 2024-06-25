<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import AdminCreateButton from '$lib/components/admin/AdminCreateButton.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;
	const teams = data.teams;
	const headers = ['Nombre', 'Acronimo', 'Escudo', 'Pais'];
	const attributes = ['name', 'acronym', 'emblem', 'country'];

	const modifyTeam = (e: CustomEvent) => {
		goto(`/admin/teams/${e.detail.id}`);
	};

	const deleteTeam = async (e: CustomEvent) => {
		const res = await fetch(`teams/${e.detail.id}?/delete`, {
			method: 'POST',
			body: new FormData()
		});
		if (res.status === 200) {
			toast.success('Se elimino el equipo');
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
	<AdminCreateButton tableName="teams" />
	<TableData
		{headers}
		{attributes}
		data={teams.map((team) => ({
			id: team.id,
			name: team.name,
			acronym: team.acronym,
			emblem: team.emblem,
			country: team.Country.name
		}))}
		filterConfig={{ show: true, placeholder: 'Buscar un Equipo' }}
		on:delete-doc={deleteTeam}
		on:modify-doc={modifyTeam}
		caption="Equipos"
	/>
</section>
