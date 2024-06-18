import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

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
	console.log(countries);

	return { team, countries };
};
