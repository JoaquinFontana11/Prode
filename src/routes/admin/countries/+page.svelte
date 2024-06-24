<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';

	export let data: PageData;
</script>

<section class="layout">
	<TableData data={data.countries} tableName="country" />
</section>
