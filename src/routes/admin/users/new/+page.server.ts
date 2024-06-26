import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { hassPass } from '$lib/encryption';

export const load: PageServerLoad = async ({ request }) => {
	return {};
};

export const actions = {
	create: async ({ request }) => {
		try {
			const form = await request.formData();

			const user = {
				username: form.get('username') + '',
				name: form.get('name') + '',
				role: form.get('role') + '',
				password: await hassPass(form.get('password') + '')
			};

			const res = await prisma.users.create({
				data: user
			});
			return { status: 200 };
		} catch (e) {
			console.log(e);
			throw error(500, e);
		}
	}
};
