import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const teams = await prisma.teams.findMany({
		include: {
			Country: true
		}
	});

	return { teams };
};
