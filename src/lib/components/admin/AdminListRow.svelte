<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let doc: any;
	export let attributes: string[];
	export let actions: string[];

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
		{:else}
			<td class="list-row__default">{doc[atr]}</td>
		{/if}
	{/each}
	<td class="list-row__default">
		<div class="flex-center action-box">
			{#if actions.includes('edit')}
				<button class="action-box__edit" on:click={modifyEvent}>Editar</button>
			{/if}
			{#if actions.includes('delete')}
				<button class="action-box__delete" on:click={deleteEvent}>Eliminar</button>
			{/if}
		</div>
	</td>
</tr>
