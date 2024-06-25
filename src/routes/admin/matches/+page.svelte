<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import AdminCreateButton from '$lib/components/admin/AdminCreateButton.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Phases } from '@prisma/client';

	export let data: PageData;
	const matches = data.matches;
	console.log(matches);
	const headers = ['Torneo', 'Local', 'Visitante', 'Fase', 'Dia', 'Resultado'];
	const attributes = ['tournament', 'local', 'visitor', 'phase', 'date', 'result'];

	const modifyTeam = (e: CustomEvent) => {
		goto(`/admin/matches/${e.detail.id}`);
	};

	const deleteTeam = async (e: CustomEvent) => {
		const res = await fetch(`matches/${e.detail.id}?/delete`, {
			method: 'POST',
			body: new FormData()
		});
		if (res.status === 200) {
			toast.success('Se elimino el partido');
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
		data={matches.map((match) => ({
			id: match.id,
			tournament: match.Tournaments?.name,
			local: match.Teams_Matches_localIDToTeams.emblem,
			visitor: match.Teams_Matches_visitorIDToTeams.emblem,
			phase: match.phase,
			date: match.date,
			result: match.result
		}))}
		filterConfig={{ show: false, placeholder: 'Buscar un Equipo' }}
		on:delete-doc={deleteTeam}
		on:modify-doc={modifyTeam}
		caption="Equipos"
	/>
</section>
