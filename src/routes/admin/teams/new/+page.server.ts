import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

export const load: PageServerLoad = async ({ request }) => {
	let countries = await prisma.country.findMany();

	countries = countries.map((country) => {
		return { value: country.id, name: country.name };
	});

	return { countries };
};

export const actions = {
	create: async ({ request }) => {
		try {
			const form = await request.formData();

			const team = {
				name: form.get('name') + '',
				acronym: form.get('acronym') + '',
				countryID: form.get('countryID') * 1,
				emblem: createUrlImg(form.get('name') + '', form.get('emblem') + '', NODE_ENV, 'emblems')
			};

			const res = await prisma.teams.create({
				data: team
			});
			return { status: 200 };
		} catch (e) {
			throw error(500, e);
		}
	}
};
