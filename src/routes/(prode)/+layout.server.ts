import type { LayoutServerLoad } from '../(prode)/$types';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '$env/static/private';
import prisma from '$lib/prisma';

export const load: LayoutServerLoad = async ({ cookies }) => {
	let user;
	const token = cookies.get('jwt');
	const privateKey = JWT_PRIVATE_KEY;

	try {
		if (!token) throw redirect(302, '/login');
		const decoded = jwt.verify(token, privateKey);

		const data = await prisma.users.findUnique({
			where: {
				id: decoded.id
			}
		});
		if (!data) throw redirect(302, '/login');
		const { password, ...userData } = data;
		user = userData;
	} catch (e) {
		throw redirect(302, '/login');
	}
	return { user: JSON.stringify(user) };
};
