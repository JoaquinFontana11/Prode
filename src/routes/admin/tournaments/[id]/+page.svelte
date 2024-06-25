<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	const tournament = data.tournament;

	let loading = false;

	const components: any[] = [
		{ type: 'text', name: 'name', label: 'Nombre', value: tournament?.name, required: true },
		{
			type: 'select',
			label: 'Activo',
			name: 'active',
			value: tournament?.active,
			required: true,
			options: [
				{ value: true, name: 'Si' },
				{ value: false, name: 'No' }
			]
		}
	];

	const updateTournament = async (e: CustomEvent) => {
		const { data } = e.detail;

		const formData = new FormData();

		formData.append('id', tournament?.id + '');
		formData.append('name', data[0].value);
		formData.append('active', data[1].value);

		const res = await fetch('?/update', {
			method: 'POST',
			body: formData
		});
		if (res.status === 200) {
			toast.success('Se editó el torneo');
			setTimeout(() => {
				goto('/admin/tournaments');
			}, 1000);
		} else {
			toast.error('Ocurrio un error con el servidor');
		}
	};
</script>

<Toaster />
<main class="layout">
	<div class="admin__section">
		<AdminForm
			title={`Equipo ${tournament?.name}`}
			{components}
			submitMessage="Editar"
			{loading}
			on:custom-submit={updateTournament}
		/>
	</div>
</main>
