<script lang="ts">
	import { onDestroy } from 'svelte';
	import { validateInputFileImage } from './validators';

	export let files: FileList;
	export let label: string;

	let dragEnter = false;
	let filename = '';
	let previewImage = '';
	export let required = false;

	const succes = {
		input: 'input-form',
		message: 'hidden'
	};

	const error = {
		input: 'input-form input-form--error',
		message: 'message-error'
	};

	let styleInput = `input-form input-form--flex`;
	let styleMessage = 'hidden';
	let errorMsg = '';

	const dropHandler = (e: any) => {
		if (e.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			[...e.dataTransfer.items].forEach((item, i) => {
				// If dropped items aren't files, reject them
				if (item.kind === 'file') {
					const file = item.getAsFile();
					filename = file.name;
				}
			});
		} else {
			// Use DataTransfer interface to access the file(s)
			[...e.dataTransfer.files].forEach((file, i) => {
				filename = file.name;
			});
		}
		dragEnter = false;
	};

	const validateInput = (e: Event) => {
		({
			message: errorMsg,
			inputStyle: styleInput,
			messageStyle: styleMessage
		} = validateInputFileImage(files, error, succes));
	};

	const uploadHandler = (e: Event) => {
		if (files.length > 0) {
			[...files].forEach((file, i) => {
				filename = file.name;
			});
			validateInput(e);

			const selectedFile = files[0];
			filename = selectedFile.name; // Actualizar el nombre del archivo en la vista

			// Crear una URL temporal para la vista previa de la imagen
			previewImage = URL.createObjectURL(selectedFile);
		}
	};

	onDestroy(() => {
		if (previewImage) {
			URL.revokeObjectURL(previewImage);
		}
	});
</script>

<div class="input-flex">
	<p class="input-flex__label">
		{label}
	</p>
	<label
		for={`dropzone-file-${label}`}
		class={styleInput}
		on:drop|preventDefault|stopPropagation={dropHandler}
		on:dragenter|preventDefault|stopPropagation={() => (dragEnter = true)}
		on:dragover|preventDefault|stopPropagation={() => (dragEnter = true)}
		on:dragleave|preventDefault|stopPropagation={() => (dragEnter = false)}
	>
		<div class="input-box--img">
			<svg
				aria-hidden="true"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/></svg
			>
			<p class="input-box__placeholder">
				<span>Click para subir</span> o arrastre y suelte un archivo
			</p>
			<p class="input-box__placeholder">{filename}</p>
		</div>
		<input
			id={`dropzone-file-${label}`}
			type="file"
			class="hidden"
			{required}
			bind:files
			on:change|preventDefault={uploadHandler}
		/>
	</label>

	{#if previewImage}
		<img src={previewImage} alt="Vista previa de la imagen" class="image-preview" />
	{/if}

	<label class={styleMessage} for={label}>{errorMsg}</label>
</div>
