<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';
	import { setDate } from '$lib/components/helpers/FormateDate';

	export let data: PageData;

	const match = data.match;
	const teams = data.teams;
	const tournaments = data.tournaments;
	let loading = false;

	const components: any[] = [
		{
			type: 'select',
			label: 'Torneo',
			name: 'tournamentID',
			value: match?.tournamentID,
			required: true,
			options: tournaments
		},
		{
			type: 'select',
			label: 'Local',
			name: 'localID',
			value: match?.localID,
			required: true,
			options: teams
		},
		{
			type: 'select',
			label: 'Visitante',
			name: 'visitorID',
			value: match?.visitorID,
			required: true,
			options: teams
		},
		{
			type: 'select',
			label: 'Fase',
			name: 'phase',
			value: match?.phase,
			required: true,
			options: [
				{ value: 'Grupos', name: 'Fase de Grupos' },
				{ value: 'Octavos', name: 'Octavos de final' },
				{ value: 'Cuartos', name: 'Cuartos de final' },
				{ value: 'Semi', name: 'Semifinal' },
				{ value: 'TerCua', name: 'Tercero y Cuarto' },
				{ value: 'Final', name: 'Final' }
			]
		},
		{
			type: 'date',
			name: 'date',
			label: 'Dia',
			value: setDate(match?.date!),
			required: true
		}
	];

	const updateTeam = async (e: CustomEvent) => {
		const { data } = e.detail;

		const formData = new FormData();

		formData.append('id', match?.id + '');
		formData.append('tournamentID', data[0].value);
		formData.append('localID', data[1].value);
		formData.append('visitorID', data[2].value);
		formData.append('phase', data[3].value);
		formData.append('date', data[4].value);

		const res = await fetch('?/update', {
			method: 'POST',
			body: formData
		});
		if (res.status === 200) {
			toast.success('Se editó el partido');
			setTimeout(() => {
				goto('/admin/matches');
			}, 1000);
		} else {
			console.log(res);
			toast.error('Ocurrio un error con el servidor');
		}
	};
</script>

<Toaster />
<main class="layout">
	<div class="admin__section">
		<AdminForm
			title={`Partido ${match?.Teams_Matches_localIDToTeams.name} VS ${match?.Teams_Matches_visitorIDToTeams.name}`}
			{components}
			submitMessage="Editar"
			{loading}
			on:custom-submit={updateTeam}
		>
			<div slot="over-form-slot">
				<button
					class="aux-btn"
					on:click={() => {
						goto(`${match?.id}/addResult`);
					}}>Cargar Resultado</button
				>
			</div>
		</AdminForm>
	</div>
</main>
