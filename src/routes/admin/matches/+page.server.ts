import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const matches = await prisma.matches.findMany({
		include: {
			Teams_Matches_localIDToTeams: true,
			Teams_Matches_visitorIDToTeams: true,
			Tournaments: true
		}
	});

	return { matches };
};
