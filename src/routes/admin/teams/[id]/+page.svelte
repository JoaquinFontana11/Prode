<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	const team = data.team;
	const countries = data.countries;
	let loading = false;

	const components: any[] = [
		{ type: 'text', name: 'name', label: 'Nombre', value: team?.name, required: true },
		{ type: 'text', name: 'acronym', label: 'Acronimo', value: team?.acronym, required: true },
		{ type: 'image', name: 'emblem', label: 'Escudo', value: '', required: false },
		{
			type: 'select',
			label: 'Pais',
			name: 'countryID',
			value: team?.countryID,
			required: true,
			options: countries
		}
	];

	const updateTeam = async (e: CustomEvent) => {
		const { data } = e.detail;
		const image = data[2].value;

		if (!image) {
			const formData = new FormData();

			formData.append('id', team?.id + '');
			formData.append('name', data[0].value);
			formData.append('acronym', data[1].value);
			formData.append('countryID', data[3].value);
			formData.append('emblem', team?.emblem!);

			const res = await fetch('?/update', {
				method: 'POST',
				body: formData
			});
			if (res.status === 200) {
				toast.success('Se editó el equipo');
				setTimeout(() => {
					goto('/admin/teams');
				}, 1000);
			} else {
				toast.error('Ocurrio un error con el servidor');
			}
		} else {
			const reader = new FileReader();
			reader.readAsDataURL(image[0]);
			reader.onload = async (e) => {
				const target = e.target as FileReader;
				const FileReaderResult = target.result as string;
				const imgData = FileReaderResult.split(',');

				const formData = new FormData();

				formData.append('id', team?.id + '');
				formData.append('name', data[0].value);
				formData.append('acronym', data[1].value);
				formData.append('countryID', data[3].value);
				formData.append('emblem', imgData[1]);

				const res = await fetch('?/update', {
					method: 'POST',
					body: formData
				});
				if (res.status === 200) {
					toast.success('Se editó el equipo');
					setTimeout(() => {
						goto('/admin/teams');
					}, 1000);
				} else {
					toast.error('Ocurrio un error con el servidor');
				}
			};
		}
	};
</script>

<Toaster />
<main class="layout">
	<div class="admin__section">
		<AdminForm
			title={`Equipo ${team?.name}`}
			{components}
			submitMessage="Editar"
			{loading}
			on:custom-submit={updateTeam}
		/>
	</div>
</main>
