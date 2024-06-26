import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

export const load: PageServerLoad = async ({ request }) => {
	return {};
};

export const actions = {
	create: async ({ request }) => {
		try {
			const form = await request.formData();

			const country = {
				name: form.get('name') + '',
				flag: createUrlImg(
					`flag_${form.get('name')}` + '',
					form.get('countries') + '',
					NODE_ENV,
					'flags'
				)
			};

			const res = await prisma.country.create({
				data: country
			});
			return { status: 200 };
		} catch (e) {
			console.log(e);
			throw error(500, e);
		}
	}
};
