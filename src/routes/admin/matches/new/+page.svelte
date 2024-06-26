<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	const teams = data.teams;
	const tournaments = data.tournaments;
	let loading = false;

	const components: any[] = [
		{
			type: 'select',
			label: 'Torneo',
			name: 'tournamentID',
			value: '',
			required: true,
			options: tournaments
		},
		{
			type: 'select',
			label: 'Local',
			name: 'localID',
			value: '',
			required: true,
			options: teams
		},
		{
			type: 'select',
			label: 'Visitante',
			name: 'visitorID',
			value: '',
			required: true,
			options: teams
		},
		{
			type: 'select',
			label: 'Fase',
			name: 'phase',
			value: '',
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
			value: '',
			required: true
		}
	];
	const createMatch = async (e: CustomEvent) => {
		const { data } = e.detail;

		const formData = new FormData();

		formData.append('tournamentID', data[0].value);
		formData.append('localID', data[1].value);
		formData.append('visitorID', data[2].value);
		formData.append('phase', data[3].value);
		formData.append('date', data[4].value);

		const res = await fetch('?/create', {
			method: 'POST',
			body: formData
		});
		if (res.status === 200) {
			toast.success('Se creo el partido');
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
			title="Nuevo Partido"
			{components}
			submitMessage="Crear"
			{loading}
			on:custom-submit={createMatch}
		/>
	</div>
</main>
