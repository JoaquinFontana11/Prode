import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const countries = await prisma.country.findMany();

	return { countries };
};
