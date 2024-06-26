<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import AdminCreateButton from '$lib/components/admin/AdminCreateButton.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;
	const users = data.users;

	const headers = ['Nombre Usuario', 'Nombre Completo', 'Rol'];
	const attributes = ['username', 'name', 'role'];

	const modifyUser = (e: CustomEvent) => {
		goto(`/admin/users/${e.detail.id}`);
	};

	const deleteUser = async (e: CustomEvent) => {
		const res = await fetch(`users/${e.detail.id}?/delete`, {
			method: 'POST',
			body: new FormData()
		});
		if (res.status === 200) {
			toast.success('Se elimino el usuario');
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
	<AdminCreateButton tableName="users" />
	<TableData
		{headers}
		{attributes}
		data={users.map((user) => ({
			id: user.id,
			name: user.name,
			username: user.username,
			role: user.role
		}))}
		filterConfig={{ show: true, placeholder: 'Buscar un Usuario' }}
		on:delete-doc={deleteUser}
		on:modify-doc={modifyUser}
		caption="Usuarios"
	/>
</section>
