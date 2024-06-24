<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';
	import AdminCreateButton from '$lib/components/admin/AdminCreateButton.svelte';
	import Searcher from '$lib/components/admin/Searcher.svelte';

	export let data: PageData;
</script>

<section class="layout">
	<AdminCreateButton tableName="teams" />
	<Searcher />
	<TableData data={data.teams} tableName="teams" />
</section>
