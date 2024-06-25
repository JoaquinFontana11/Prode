import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const users = await prisma.users.findMany({});

	return { users };
};
