<script lang="ts">
	import type { PageData } from './$types';
	import TableData from '$lib/components/admin/AdminTable.svelte';

	export let data: PageData;
</script>

<TableData data={data.countries} />
