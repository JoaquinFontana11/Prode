<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import AdminCreateButton from '$lib/components/admin/AdminCreateButton.svelte';
	import { goto } from '$app/navigation';
	import { setDate } from '$lib/components/helpers/FormateDate';

	export let data: PageData;
	const matches = data.matches;
	console.log(matches);
	const headers = ['Torneo', 'Local', 'Visitante', 'Fase', 'Dia', 'Resultado'];
	const attributes = ['tournament', 'local', 'visitor', 'phase', 'date', 'result'];
	const options = [
		{ value: 'Grupos', name: 'Fase de Grupos' },
		{ value: 'Octavos', name: 'Octavos de final' },
		{ value: 'Cuartos', name: 'Cuartos de final' },
		{ value: 'Semi', name: 'Semifinal' },
		{ value: 'TerCua', name: 'Tercero y Cuarto' },
		{ value: 'Final', name: 'Final' }
	];

	const modifyTeam = (e: CustomEvent) => {
		goto(`/admin/matches/${e.detail.id}`);
	};
</script>

<section class="layout">
	<AdminCreateButton tableName="matches" />
	<TableData
		{headers}
		{attributes}
		data={matches.map((match) => ({
			id: match.id,
			tournament: match.Tournaments?.name,
			local: {
				name: match.Teams_Matches_localIDToTeams.name,
				emblem: match.Teams_Matches_localIDToTeams.emblem
			},
			visitor: {
				name: match.Teams_Matches_visitorIDToTeams.name,
				emblem: match.Teams_Matches_visitorIDToTeams.emblem
			},
			phase: match.phase,
			date: setDate(match.date),
			result: match.Results_Results_matchIDToMatches
		}))}
		filterConfig={{
			showSelect: true,
			showSearcher: true,
			placeholder: 'Buscar un Torneo',
			options: options
		}}
		actions={['edit']}
		on:modify-doc={modifyTeam}
		caption="Partidos"
	/>
</section>
