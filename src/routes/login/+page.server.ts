import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { hassPass, descriptPass } from '$lib/encryption';
import prisma from '$lib/prisma';
import { JWT_PRIVATE_KEY, NODE_ENV } from '$env/static/private';

const login = async ({ cookies, request }) => {
	const data = Object.fromEntries(await request.formData());

	if (!data.username || !data.password)
		return fail(400, { fail: true, message: 'Debe completar todos los campos' });

	const user = await prisma.users.findUnique({
		where: {
			username: data.username
		}
	});

	if (!user) return fail(400, { fail: true, message: 'Usuario o contraseña invalidos' });
	if (user && !(await descriptPass(data.password, user.password)))
		return fail(400, { fail: true, message: 'Usuario o contraseña invalidos' });

	const privateKey = JWT_PRIVATE_KEY;
	const token = jwt.sign({ id: user.id }, privateKey, {
		expiresIn: '1h'
	});

	cookies.set('jwt', token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/');
};

const logout = async ({ cookies }) => {
	cookies.delete('jwt');
	throw redirect(302, '/login');
};

export const actions = {
	login,
	logout
};
