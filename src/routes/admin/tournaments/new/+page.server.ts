import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

const stringToBooleanMap = {
	true: true,
	false: false
};

export const load: PageServerLoad = async ({ request }) => {
	return {};
};

export const actions = {
	create: async ({ request }) => {
		try {
			const form = await request.formData();

			const tournament = {
				name: form.get('name') + '',
				active: stringToBooleanMap[form.get('active')]
			};

			const res = await prisma.tournaments.create({
				data: tournament
			});
			return { status: 200 };
		} catch (e) {
			console.log(e);
			throw error(500, e);
		}
	}
};
