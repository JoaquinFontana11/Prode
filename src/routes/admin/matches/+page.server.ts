import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	let matches = await prisma.matches.findMany({
		include: {
			Teams_Matches_localIDToTeams: true,
			Teams_Matches_visitorIDToTeams: true,
			Tournaments: true,
			Results_Results_matchIDToMatches: true
		}
	});

	matches = matches.map((match) => {
		match.Results_Results_matchIDToMatches = match.Results_Results_matchIDToMatches[0];
		match.date.setHours(30);

		return match;
	});

	return { matches };
};
