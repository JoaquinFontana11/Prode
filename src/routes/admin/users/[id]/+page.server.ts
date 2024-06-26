import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id * 1;
	const user = await prisma.users.findUnique({
		where: {
			id: id
		}
	});

	return { user };
};

export const actions = {
	update: async ({ request }) => {
		try {
			const form = await request.formData();

			const user = {
				username: form.get('username') + '',
				name: form.get('name') + '',
				role: form.get('role') + ''
			};

			const res = await prisma.users.update({
				where: {
					id: form.get('id') * 1
				},
				data: user
			});
			return { status: 200 };
		} catch (e) {
			throw error(500, e);
		}
	},
	delete: async ({ params }) => {
		const id = params.id * 1;

		const team = await prisma.users.delete({
			where: {
				id: id
			}
		});
	}
};
