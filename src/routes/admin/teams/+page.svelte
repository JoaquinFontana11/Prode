<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import NewButton from '$lib/components/admin/NewButton.svelte';
	import Searcher from '$lib/components/admin/Searcher.svelte';

	export let data: PageData;
</script>

<NewButton />
<Searcher />
<TableData data={data.teams} tableName="teams" />
