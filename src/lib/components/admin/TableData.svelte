<script lang="ts">
	import { PencilSquare, Trash } from 'svelte-heros-v2';
	export let data;
	console.log(data[0]);

	const transalteHeaders = {
		name: 'Nombre',
		acronym: 'Acronimo',
		emblem: 'Escudo',
		Country: 'Pais',
		flag: 'Bandera'
	};

	let tableHeaders = Object.keys(data[0]);
	tableHeaders = tableHeaders.filter((item) => item !== 'id' && item !== 'countryID');
	const tableHeadersTranslate = tableHeaders.map(
		(header) => transalteHeaders[header as keyof typeof transalteHeaders]
	);
	console.log(tableHeaders);
</script>

<table class="table">
	<thead class="table__head">
		<tr class="table__head__row">
			{#each tableHeadersTranslate as header}
				<th class="table__head__row--text">{header}</th>
			{/each}
			<th class="table__head__row--text">Acciones</th>
		</tr>
	</thead>
	<tbody class="table__body">
		{#each data as d}
			<tr class="table__body__row">
				{#each tableHeaders as header}
					{#if header === 'emblem' || header === 'flag'}
						<td class="table__body__row--img">
							<img src={d[header]} alt="escudo" />
						</td>
					{:else if header === 'Country'}
						<td class="table__body__row--country">
							{d[header].name}
						</td>
					{:else}
						<td class="table__body__row--text">
							{d[header]}
						</td>
					{/if}
				{/each}
				<td class="table__body__row--actions">
					<button class="action-button">
						<PencilSquare size="20" color="blue" />
					</button>
					<button class="action-button">
						<Trash size="20" color="red" />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
