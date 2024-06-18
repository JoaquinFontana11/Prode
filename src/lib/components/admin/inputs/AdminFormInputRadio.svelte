<script lang="ts">
	import { validateInputText } from './validators';

	export let value: string;
	export let label: string;
	export let required = false;

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
		} = validateInputText(value, error, succes));
	};
</script>

<div>
	<label class="input-flex__label" for={label}>{label}</label>
	<input id={label} type="checkbox" {required} bind:value on:blur|preventDefault={validateInput} />
	El servicio se mostrará en el home
	<label class={styleMessage} for={label}>{errorMsg}</label>
</div>
