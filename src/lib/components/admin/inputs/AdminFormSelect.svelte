<script lang="ts">
	import { validateEmptyInput } from './validators';

	export let value: string | number | Date | boolean;
	export let label: string;
	export let required = false;
	export let options: any;
	export let disabled: boolean = false;

	const succes = {
		input: 'input-form',
		message: 'hidden'
	};

	const error = {
		input: 'input-form input-form--error',
		message: 'message-error'
	};

	let styleInput = 'input-form';
	let styleMessage = 'hidden';
	let errorMsg = '';

	const validateInput = (e: Event) => {
		({
			message: errorMsg,
			inputStyle: styleInput,
			messageStyle: styleMessage
		} = validateEmptyInput(value, error, succes));
	};
</script>

<div>
	<label class="input-flex__label" for={label}>{label}</label>
	<select
		id={label}
		class={styleInput}
		{required}
		{disabled}
		bind:value
		on:blur|preventDefault={validateInput}
	>
		{#each options as option}
			<option value={option.value}>{option.name}</option>
		{/each}
	</select>
	<label class={styleMessage} for={label}>{errorMsg}</label>
</div>
