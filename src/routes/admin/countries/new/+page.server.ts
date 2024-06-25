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
			console.log(request);
			console.log(form);

			const country = {
				name: form.get('name') + '',
				flag: createUrlImg(
					`flag_${form.get('name')}` + '',
					form.get('countries') + '',
					NODE_ENV,
					'flags'
				)
			};
			console.log(country);

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
