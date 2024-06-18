<script lang="ts">
	import Editor from 'cl-editor/src/Editor.svelte';
	export let label: string;
	export let value: string;
	let html = value;
</script>

<div class="input-flex">
	<p class="input-flex__label">
		{label}
	</p>
	<Editor
		{value}
		{html}
		on:change={(e) => {
			value = e.detail;
			html = e.detail;
		}}
	/>
</div>
