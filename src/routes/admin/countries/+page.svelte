<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import AdminCreateButton from '$lib/components/admin/AdminCreateButton.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;
	const countries = data.countries;
	console.log(countries);
	const headers = ['Nombre', 'Bandera'];
	const attributes = ['name', 'flag'];

	const modifyCountry = (e: CustomEvent) => {
		goto(`/admin/countries/${e.detail.id}`);
	};

	const deleteCountry = async (e: CustomEvent) => {
		const res = await fetch(`countries/${e.detail.id}?/delete`, {
			method: 'POST',
			body: new FormData()
		});
		if (res.status === 200) {
			toast.success('Se elimino el pais');
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
	<AdminCreateButton tableName="countries" />
	<TableData
		{headers}
		{attributes}
		data={countries.map((country) => ({
			id: country.id,
			name: country.name,
			flag: country.flag
		}))}
		filterConfig={{ show: true, placeholder: 'Buscar un Pais' }}
		on:delete-doc={deleteCountry}
		on:modify-doc={modifyCountry}
		caption="Paises"
	/>
</section>
