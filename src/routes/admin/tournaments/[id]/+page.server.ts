import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

const stringToBooleanMap = {
	true: true,
	false: false
};

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id * 1;
	const tournament = await prisma.tournaments.findUnique({
		where: {
			id: id
		}
	});

	return { tournament };
};

export const actions = {
	update: async ({ request }) => {
		try {
			const form = await request.formData();

			const tournament = {
				name: form.get('name') + '',
				active: stringToBooleanMap[form.get('active')]
			};

			const res = await prisma.tournaments.update({
				where: {
					id: form.get('id') * 1
				},
				data: tournament
			});
			return { status: 200 };
		} catch (e) {
			throw error(500, e);
		}
	},
	delete: async ({ params }) => {
		const id = params.id * 1;

		const tournament = await prisma.tournaments.delete({
			where: {
				id: id
			}
		});
	}
};
