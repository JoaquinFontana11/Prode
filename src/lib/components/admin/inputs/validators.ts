const error = {
	input: 'input-form input-form--error',
	message: 'message-error'
};

const extensionErrorTypes = ['.zip', '.rar', '.exe', '.iso'];
const extensionsImages = ['.jpg', '.png', '.jpeg', '.jfif'];

const factoryValidators = (type: string | null = null) => {
	return (
		value: any,
		styleError: { input: string; message: string } = error,
		styleSucces: { input: string; message: string } = { input: 'input-form', message: 'hidden' }
	) => {
		let message = '';
		if (value === '') message = 'Debe completar este campo';
		if (type == 'text' && /[|°¬#$%&@='´¨+*~}{[^}_]/.test(value))
			message = 'No se admiten caracteres especiales';
		if (type == 'file' && validateFilesAndImages(value, extensionErrorTypes))
			message = 'No se admiten archivos con esa extension';
		if (type == 'image' && !validateFilesAndImages(value, extensionsImages))
			message = 'Solo se admiten Imagenes';

		if (message)
			return {
				message,
				inputStyle: styleError.input,
				messageStyle: styleError.message,
				status: false
			};

		return {
			message: 'Correcto!',
			inputStyle: 'input-form',
			messageStyle: 'hidden',
			status: true
		};
	};
};

const validateFilesAndImages = (files: FileList, extensions: Array<string>): Boolean => {
	return [...files].some((file, i) => {
		return extensions.some((str) => file.name.toLowerCase().endsWith(str));
	});
};

const validateEmptyInput = factoryValidators();
const validateInputText = factoryValidators('text');
const validateInputFile = factoryValidators('file');
const validateInputFileImage = factoryValidators('image');

export { validateEmptyInput, validateInputText, validateInputFile, validateInputFileImage };
