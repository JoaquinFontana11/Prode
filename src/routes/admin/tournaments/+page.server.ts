import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const tournaments = await prisma.tournaments.findMany();

	return { tournaments };
};
