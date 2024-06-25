<script lang="ts">
	import type { PageData } from './$types';
	import AdminForm from '$lib/components/admin/AdminForm.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;

	const user = data.user;
	let loading = false;

	const components: any[] = [
		{
			type: 'text',
			name: 'username',
			label: 'Nombre Usuario',
			value: user?.username,
			required: true
		},
		{ type: 'text', name: 'name', label: 'Nombre Completo', value: user?.name, required: true },
		{
			type: 'select',
			label: 'Rol',
			name: 'role',
			value: user?.role,
			required: true,
			options: [
				{ value: 'ADMIN', name: 'Administrador' },
				{ value: 'USER', name: 'Usuario' }
			]
		}
	];

	const updateUser = async (e: CustomEvent) => {
		const { data } = e.detail;

		const formData = new FormData();

		formData.append('id', user?.id + '');
		formData.append('username', data[0].value);
		formData.append('name', data[1].value);
		formData.append('role', data[2].value);

		const res = await fetch('?/update', {
			method: 'POST',
			body: formData
		});
		if (res.status === 200) {
			toast.success('Se editó el usuario');
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
			title={`Usuario ${user?.name}`}
			{components}
			submitMessage="Editar"
			{loading}
			on:custom-submit={updateUser}
		/>
	</div>
</main>
