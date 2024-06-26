<script lang="ts">
	import { createEventDispatcher, type ComponentType } from 'svelte';
	import AdminListRow from './AdminListRow.svelte';

	export let data: any[];
	export let headers: string[];
	export let attributes: string[];
	export let actions: string[] = ['edit', 'delete'];
	export let caption: string = '';
	export let customRow: ComponentType | null = null; // podemos pasar una fila customizada si la tabla tiene que ser distinta
	export let filterConfig: {
		showSelect: boolean;
		showSearcher: boolean;
		placeholder: string;
		options: { value: string; name: string }[];
	};
	console.log(data);
	const dispatch = createEventDispatcher();
	let filterSearcher: string = '';
	let filterSelect: string = 'all';

	const deleteEvent = (e: CustomEvent) => {
		dispatch('delete-doc', { id: e.detail.id, doc: e.detail.doc });
	};

	const modifyEvent = (e: CustomEvent) => {
		dispatch('modify-doc', { id: e.detail.id, doc: e.detail.doc });
	};
</script>

<div class="header-box">
	<span class="header-box__title">{caption}</span>
	<div class="header-box__filters-box">
		{#if filterConfig.showSelect}
			<select
				class="header-box__filters-box__filter"
				name="select"
				id="select"
				bind:value={filterSelect}
			>
				<option value="all">Todos</option>
				{#each filterConfig.options as option}
					<option value={option.value}>{option.name}</option>
				{/each}
			</select>
		{/if}
		{#if filterConfig.showSearcher}
			<input
				class="header-box__filters-box__filter header-box__filters-box__filter--width"
				type="text"
				placeholder={filterConfig.placeholder}
				bind:value={filterSearcher}
			/>
		{/if}
	</div>
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
		{#each data.filter((d) => {
			if (caption === 'Partidos') {
				if (filterSelect === 'all') {
					return d.tournament.toLowerCase().includes(filterSearcher.toLowerCase());
				} else {
					return d.phase
							.toLowerCase()
							.includes(filterSearcher.toLowerCase()) && filterSelect && d.phase === filterSelect;
				}
			} else return d.name.toLowerCase().includes(filterSearcher.toLowerCase());
		}) as doc}
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
