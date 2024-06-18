<script lang="ts">
	import { validateEmptyInput } from './validators';

	export let value: string;
	export let label: string;
	export let required = false;

	const succes = {
		input: 'input-form',
		message: 'hidden'
	};

	const error = {
		input: 'input-form input-form-error',
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
	<input
		id={label}
		type="password"
		class={styleInput}
		{required}
		bind:value
		on:blur|preventDefault={validateInput}
	/>
	<label class={styleMessage} for={label}>{errorMsg}</label>
</div>
