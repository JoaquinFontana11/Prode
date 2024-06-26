import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id * 1;
	const team = await prisma.teams.findUnique({
		where: {
			id: id
		},
		include: {
			Country: true
		}
	});

	let countries = await prisma.country.findMany();

	countries = countries.map((country) => {
		return { value: country.id, name: country.name };
	});

	return { team, countries };
};

export const actions = {
	update: async ({ request }) => {
		try {
			const form = await request.formData();

			const team = {
				name: form.get('name') + '',
				acronym: form.get('acronym') + '',
				countryID: form.get('countryID') * 1,
				emblem: form.get('emblem').toString().includes('/img/emblems/')
					? form.get('emblem')
					: createUrlImg(form.get('name') + '', form.get('emblem') + '', NODE_ENV, 'emblems')
			};

			const res = await prisma.teams.update({
				where: {
					id: form.get('id') * 1
				},
				data: team
			});
			return { status: 200 };
		} catch (e) {
			throw error(500, e);
		}
	},
	delete: async ({ params }) => {
		const id = params.id * 1;

		const team = await prisma.teams.delete({
			where: {
				id: id
			}
		});
	}
};
