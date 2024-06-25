<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	const country = data.country;
	let loading = false;

	const components: any[] = [
		{ type: 'text', name: 'name', label: 'Nombre', value: country?.name, required: true },
		{ type: 'image', name: 'flag', label: 'Escudo', value: '', required: false }
	];

	const updateCountry = async (e: CustomEvent) => {
		const { data } = e.detail;
		const image = data[1].value;

		if (!image) {
			const formData = new FormData();

			formData.append('id', country?.id + '');
			formData.append('name', data[0].value);
			formData.append('flag', country?.flag!);

			const res = await fetch('?/update', {
				method: 'POST',
				body: formData
			});
			if (res.status === 200) {
				toast.success('Se editó el pais');
				setTimeout(() => {
					goto('/admin/countries');
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

				formData.append('id', country?.id + '');
				formData.append('name', data[0].value);
				formData.append('flag', imgData[1]);

				const res = await fetch('?/update', {
					method: 'POST',
					body: formData
				});
				if (res.status === 200) {
					toast.success('Se editó el pais');
					setTimeout(() => {
						goto('/admin/countries');
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
			title={`Pais ${country?.name}`}
			{components}
			submitMessage="Editar"
			{loading}
			on:custom-submit={updateCountry}
		/>
	</div>
</main>
