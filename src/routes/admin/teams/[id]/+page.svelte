<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';

	export let data: PageData;

	const team = data.team;
	const countries = data.countries;
	let loading = false;

	const components: any[] = [
		{ type: 'text', label: 'Nombre', value: team?.name, required: true },
		{ type: 'text', label: 'Acronimo', value: team?.acronym, required: true },
		{ type: 'image', label: 'Escudo', value: team?.emblem, required: true },
		{
			type: 'select',
			label: 'Pais',
			name: 'country',
			value: team?.countryID,
			required: true,
			options: [countries]
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
			formData.append('image', team?.emblem!);

			const res = await fetch('?/update', {
				method: 'POST',
				body: formData
			});
			console.log('CONSOLA DE NO IMAGENNNN');
			console.log(res);
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
				formData.append('image', imgData[1]);

				const res = await fetch('?/update', {
					method: 'POST',
					body: formData
				});
				console.log('CONSOLA DE IMAGENNNN');
				console.log(res);
			};
		}
	};
</script>

<main>
	<div>
		<AdminForm
			title={`Equipo ${team?.name}`}
			{components}
			submitMessage="Editar"
			{loading}
			on:custom-submit={updateTeam}
		/>
	</div>
</main>
