<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	const match = data.match;
	let loading = false;

	const components: any[] = [
		{
			type: 'number',
			label: `Goles ${match?.Teams_Matches_localIDToTeams.name}`,
			name: 'local',
			value: '',
			required: true
		},
		{
			type: 'number',
			label: `Goles ${match?.Teams_Matches_visitorIDToTeams.name}`,
			name: 'visitor',
			value: '',
			required: true
		},
		{
			type: 'select',
			label: 'Hubo penales?',
			name: 'penalties',
			value: '',
			required: true,
			options: [
				{ value: true, name: 'Si' },
				{ value: false, name: 'No' }
			]
		},
		{
			type: 'penalty',
			label: `Penales de ${match?.Teams_Matches_localIDToTeams.name}`,
			name: 'penaly_local',
			value: '',
			required: true
		},
		{
			type: 'penalty',
			label: `Penales de ${match?.Teams_Matches_visitorIDToTeams.name}`,
			name: 'penalty_visitor',
			value: '',
			required: true
		}
	];

	const createResult = async (e: CustomEvent) => {
		const { data } = e.detail;

		const formData = new FormData();

		formData.append('local', data[0].value);
		formData.append('visitor', data[1].value);
		formData.append('penalties', data[2].value);
		formData.append('penalty_local', data[3].value);
		formData.append('penalty_visitor', data[4].value);
		formData.append('matchID', match?.id + '');
		formData.append('is_prediction', 'false');

		const res = await fetch('?/create', {
			method: 'POST',
			body: formData
		});
		if (res.status === 200) {
			toast.success('Se creo el resultado');
			setTimeout(() => {
				goto('/admin/matches');
			}, 1000);
		} else {
			console.log(res);
			toast.error('Ocurrio un error con el servidor');
		}
	};
</script>

<p>hola perdida</p>
<Toaster />
<main class="layout">
	<div class="admin__section">
		<AdminForm
			title={`Partido ${match?.Teams_Matches_localIDToTeams.name} VS ${match?.Teams_Matches_visitorIDToTeams.name}`}
			{components}
			submitMessage="Editar"
			{loading}
			on:custom-submit={createResult}
		>
			<div slot="top-slot">
				{components[2].value}
			</div>
		</AdminForm>
	</div>
</main>
