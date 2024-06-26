<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let doc: any;
	export let attributes: string[];
	export let actions: string[];

	console.log(doc);

	const dispatch = createEventDispatcher();

	const deleteEvent = (e: Event) => {
		dispatch('delete-doc', { id: doc.id, doc: doc });
	};

	const modifyEvent = (e: Event) => {
		dispatch('modify-doc', { id: doc.id, doc: doc });
	};
</script>

<tr class="list-row">
	{#each attributes as atr}
		{#if atr === 'active'}
			<td class="list-row__boolean">
				<div class="flex-center">
					<div
						class="list-row__boolean__text"
						class:list-row__boolean--active={doc[atr]}
						class:list-row__boolean--inactive={!doc[atr]}
					/>
					<span>
						{`${doc[atr] ? 'Activo' : 'Inactivo'}`}
					</span>
				</div>
			</td>
		{:else if atr === 'flag' && doc.flag}
			<td class="list-row__image">
				<img
					class="list-row__image__img"
					src={!doc.flag || doc.flag === '#' ? 'img/default.png' : doc.flag}
					alt="Foto"
				/>
			</td>
		{:else if atr === 'emblem' && doc.emblem}
			<td class="list-row__image">
				<img
					class="list-row__image__img"
					src={!doc.emblem || doc.emblem === '#' ? 'img/default.png' : doc.emblem}
					alt="Foto"
				/>
			</td>
		{:else if atr === 'local' && doc.local}
			<td class="list-row__image">
				<img
					class="list-row__image__img"
					src={!doc.local || doc.local === '#' ? 'img/default.png' : doc.local.emblem}
					alt="Foto"
				/>
				<p class="list-row__image__name">{doc.local.name}</p>
			</td>
		{:else if atr === 'visitor' && doc.visitor}
			<td class="list-row__image">
				<img
					class="list-row__image__img"
					src={!doc.visitor || doc.visitor === '#' ? 'img/default.png' : doc.visitor.emblem}
					alt="Foto"
				/>
				<p class="list-row__image__name">{doc.visitor.name}</p>
			</td>
		{:else if atr === 'result'}
			<td class="list-row__default">
				{#if doc[atr]}
					<p>{`${doc[atr].local}-${doc[atr].visitor}`}</p>
					{#if doc[atr].penalties}
						<p>{`Penales: ${doc[atr].penalty_local}-${doc[atr].penalty_visitor}`}</p>
					{:else}
						<p>Sin penales</p>
					{/if}
				{:else}
					<p>No cargado</p>
				{/if}
			</td>
		{:else}
			<td class="list-row__default">{doc[atr]}</td>
		{/if}
	{/each}
	<td class="list-row__default">
		<div class="flex-center action-box">
			{#if !doc.result}
				{#if actions.includes('edit')}
					<button class="action-box__edit" on:click={modifyEvent}>Editar</button>
				{/if}
				{#if actions.includes('delete')}
					<button class="action-box__delete" on:click={deleteEvent}>Eliminar</button>
				{/if}
			{/if}
		</div>
	</td>
</tr>
