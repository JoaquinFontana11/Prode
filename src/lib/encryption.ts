import * as bcrypt from 'bcrypt';

export const hassPass = async (pass: string) => {
	return await bcrypt.hash(pass, 10);
};

export const descriptPass = async (pass: string, password_encriptado: string) => {
	return await bcrypt.compare(pass, password_encriptado);
};
