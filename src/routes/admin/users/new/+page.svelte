<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	let loading = false;

	const components: any[] = [
		{ type: 'text', name: 'username', label: 'Nombre Usuario', value: '', required: true },
		{ type: 'text', name: 'name', label: 'Nombre Completo', value: '', required: true },
		{
			type: 'select',
			label: 'Rol',
			name: 'role',
			value: '',
			required: true,
			options: [
				{ value: 'ADMIN', name: 'Administrador' },
				{ value: 'USER', name: 'Usuario' }
			]
		}
	];

	const createUser = async (e: CustomEvent) => {
		const { data } = e.detail;

		const formData = new FormData();

		formData.append('username', data[0].value);
		formData.append('name', data[1].value);
		formData.append('role', data[2].value);

		formData.append('password', `${data[0].value}123`);

		const res = await fetch('?/create', {
			method: 'POST',
			body: formData
		});
		if (res.status === 200) {
			toast.success('Se creo el usuario');
			setTimeout(() => {
				goto('/admin/users');
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
			title="Nuevo Usuario"
			{components}
			submitMessage="Crear"
			{loading}
			on:custom-submit={createUser}
		/>
	</div>
</main>
