<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import AdminFormInputText from './inputs/AdminFormInputText.svelte';
	import AdminFormInputNumber from './inputs/AdminFormInputNumber.svelte';
	import AdminFormInputDate from './inputs/AdminFormInputDate.svelte';
	import AdminFormSelect from './inputs/AdminFormSelect.svelte';
	import AdminFormFileImageInput from './inputs/AdminFormFileImageInput.svelte';
	import AdminFormEditor from './inputs/AdminFormEditor.svelte';
	import AdminFormInputRadio from './inputs/AdminFormInputRadio.svelte';
	import Spinner from '../Spinner.svelte';

	const dispatch = createEventDispatcher();

	export let components: any[];
	export let title: string;
	export let submitMessage: string;
	export let loading: boolean;

	const handlerSubmit = async (e: Event) => {
		dispatch('custom-submit', {
			data: components.map((component) => {
				return { input: component.name, value: component.value };
			})
		});
	};
</script>

<slot name="over-form-slot" />
<form class="form-data" on:submit|preventDefault={handlerSubmit}>
	<!-- Dejamos un slot para ampliar la funcionalidad del formulario dependiendo la necesidad -->
	<slot name="top-slot" />
	<legend class="form-data__title">{title}</legend>
	{#each components as component}
		{#if component.type === 'text'}
			<AdminFormInputText
				label={component.label}
				bind:value={component.value}
				required={component.required}
			/>
		{:else if component.type === 'number'}
			<AdminFormInputNumber
				label={component.label}
				bind:value={component.value}
				required={component.required}
			/>
		{:else if component.type === 'penalty' && components[2].value}
			<AdminFormInputNumber
				label={component.label}
				bind:value={component.value}
				required={component.required}
			/>
		{:else if component.type === 'date'}
			<AdminFormInputDate
				label={component.label}
				bind:value={component.value}
				required={component.required}
			/>
		{:else if component.type === 'radio'}
			<AdminFormInputRadio
				label={component.label}
				bind:value={component.value}
				required={component.required}
			/>
		{:else if component.type === 'select'}
			<AdminFormSelect
				label={component.label}
				options={component.options}
				bind:value={component.value}
				required={component.required}
			/>
		{:else if component.type === 'image'}
			<AdminFormFileImageInput
				label={component.label}
				bind:files={component.value}
				required={component.required}
			/>
		{:else if component.type === 'editor'}
			<AdminFormEditor label={component.label} bind:value={component.value} />
		{/if}
	{/each}
	<slot name="bottom-slot" />
	<button class="	form-data__btn-submit">
		{#if loading}
			<Spinner />
		{:else}
			{submitMessage}
		{/if}
	</button>
</form>
