<script lang="ts">
	import { createEventDispatcher, type ComponentType } from 'svelte';
	import AdminListRow from './AdminListRow.svelte';

	export let data: any[];
	export let headers: string[];
	export let attributes: string[];
	export let actions: string[] = ['edit', 'delete'];
	export let caption: string = '';
	export let customRow: ComponentType | null = null; // podemos pasar una fila customizada si la tabla tiene que ser distinta
	export let filterConfig: { show: boolean; placeholder: string };

	const dispatch = createEventDispatcher();
	let filter: string = '';

	const deleteEvent = (e: CustomEvent) => {
		dispatch('delete-doc', { id: e.detail.id, doc: e.detail.doc });
	};

	const modifyEvent = (e: CustomEvent) => {
		dispatch('modify-doc', { id: e.detail.id, doc: e.detail.doc });
	};
</script>

<div class="header-box">
	<span class="header-box__title">{caption}</span>
	{#if filterConfig.show}
		<input
			class="header-box__filter"
			type="text"
			placeholder={filterConfig.placeholder}
			bind:value={filter}
		/>
	{/if}
</div>
<table class="table-list">
	<thead class="table-list__head">
		{#each headers as header}
			<th
				class="table-list__head__row"
				class:table-list__head__row--width={['Imagen', 'Icono', 'Fecha', 'Direccion'].includes(
					header
				)}
			>
				{header}
			</th>
		{/each}
		<th class="table-list__head__row table-list__head__row--width">Acciones</th>
	</thead>
	<tbody class="table-list__body">
		{#each data.filter((d) => filterConfig.show && d.name
					.toLowerCase()
					.includes(filter.toLowerCase())) as doc}
			{#if !customRow}
				<AdminListRow
					{doc}
					{attributes}
					on:modify-doc={modifyEvent}
					on:delete-doc={deleteEvent}
					{actions}
				/>
			{:else}
				<svelte:component
					this={customRow}
					{doc}
					{attributes}
					on:modify-doc={modifyEvent}
					on:delete-doc={deleteEvent}
					{actions}
				/>
			{/if}
		{/each}
	</tbody>
</table>
