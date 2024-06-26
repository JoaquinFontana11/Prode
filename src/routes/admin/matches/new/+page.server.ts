import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

export const load: PageServerLoad = async ({ request }) => {
	let teams = await prisma.teams.findMany();

	teams = teams.map((team) => {
		return { value: team.id, name: team.name };
	});

	let tournaments = await prisma.tournaments.findMany();

	tournaments = tournaments.map((tournament) => {
		return { value: tournament.id, name: tournament.name };
	});

	return { teams, tournaments };
};

export const actions = {
	create: async ({ request }) => {
		try {
			const form = await request.formData();

			const match = {
				tournamentID: form.get('tournamentID') * 1,
				localID: form.get('localID') * 1,
				visitorID: form.get('visitorID') * 1,
				phase: form.get('phase') + '',
				date: new Date(form.get('date'))
			};

			match.date.setHours(30);

			const res = await prisma.matches.create({
				data: match
			});
			return { status: 200 };
		} catch (e) {
			console.log(e);
			throw error(500, e);
		}
	}
};
