<script lang="ts">
	import { Plus } from 'svelte-heros-v2';

	export let tableName: string;
</script>

<div class="absolute-box">
	<a class="create-btn" href={`/admin/${tableName}/new`}>
		<Plus size="30" color="white" />
	</a>
</div>
