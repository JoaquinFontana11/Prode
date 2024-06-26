import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id * 1;

	const country = await prisma.country.findUnique({
		where: {
			id: id
		}
	});

	return { country };
};

export const actions = {
	update: async ({ request }) => {
		try {
			const form = await request.formData();

			const country = {
				name: form.get('name') + '',
				flag: form.get('flag').toString().includes('/img/flags/')
					? form.get('flag')
					: createUrlImg(`flag_${form.get('name')}`, form.get('flag') + '', NODE_ENV, 'flags')
			};

			const res = await prisma.country.update({
				where: {
					id: form.get('id') * 1
				},
				data: country
			});
			return { status: 200 };
		} catch (e) {
			console.log(e);
			throw error(500, e);
		}
	},
	delete: async ({ params }) => {
		const id = params.id * 1;

		const country = await prisma.country.delete({
			where: {
				id: id
			}
		});
	}
};
