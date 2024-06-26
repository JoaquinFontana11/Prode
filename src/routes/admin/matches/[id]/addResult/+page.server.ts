import type { PageServerLoad, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { NODE_ENV } from '$env/static/private';
import prisma from '$lib/prisma';
import { createUrlImg } from '$lib/components/helpers/FormateImage';

const stringToBooleanMap = {
	true: true,
	false: false
};

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id * 1;
	const match = await prisma.matches.findUnique({
		where: {
			id: id
		},
		include: {
			Teams_Matches_localIDToTeams: true,
			Teams_Matches_visitorIDToTeams: true
		}
	});

	if (match) match.date.setHours(30);

	return { match };
};

export const actions = {
	create: async ({ params, request }) => {
		try {
			const form = await request.formData();

			const result = {
				local: form.get('local') * 1,
				visitor: form.get('visitor') * 1,
				penalties: stringToBooleanMap[form.get('penalties')],
				penalty_local: form.get('penalty_local') * 1,
				penalty_visitor: form.get('penalty_visitor') * 1,
				is_prediction: stringToBooleanMap[form.get('is_prediction')],
				matchID: form.get('matchID') * 1
			};

			const res = await prisma.results.create({
				data: result
			});

			const match = await prisma.matches.update({
				where: {
					id: params.id * 1
				},
				data: {
					resultID: res.id
				}
			});
			console.log(res);
			console.log(match);

			await calculatePoints(res, match.id, match.tournamentID);

			return { status: 200 };
		} catch (e) {
			console.log(e);
			throw error(500, e);
		}
	}
};

const calculatePoints = async (matchResult: any, matchID: integer, tournamentID: integer) => {
	const predictionsResults = await prisma.results.findMany({
		where: {
			is_prediction: true,
			matchID: matchID
		}
	});

	await predictionsResults.forEach(async (result) => {
		let succesMatch = false;
		let succesGoals = true;
		let winner: string;
		let points: number = 0;

		const prediction = await prisma.predictions.findUnique({
			where: {
				predictionID: result.id
			}
		});

		if (!prediction) return;

		// Si no hubo penales y no marcaste que hubo penales, se calcula en base a los goles
		if (!matchResult.penalties && !result.penalties) {
			if (matchResult.local > matchResult.visitor) {
				winner = 'local';
			} else if (matchResult.visitor > matchResult.local) {
				winner = 'visitor';
			}

			if (matchResult.local === result.local && matchResult.visitor === result.visitor) {
				succesGoals = true;
			} else if (
				(winner === 'local' && result.local > result.visitor) ||
				(winner === 'visitor' && result.visitor > result.local)
			) {
				succesMatch = true;
			}
			//Si hubo penales y lo marcaste, se calcula en base a los penales
		} else if (matchResult.penalties && result.penalties) {
			if (matchResult.penalty_local > matchResult.penalty_visitor) {
				winner = 'local';
			} else if (matchResult.penalty_visitor > matchResult.penalty_local) {
				winner = 'visitor';
			}

			if (
				matchResult.penalty_local === result.penalty_local &&
				matchResult.penalty_visitor === result.penalty_visitor
			) {
				succesGoals = true;
			} else if (
				(winner === 'local' && result.penalty_local > result.penalty_visitor) ||
				(winner === 'visitor' && result.penalty_visitor > result.penalty_local)
			) {
				succesMatch = true;
			}
			//Si hubo penales y no lo marcaste, solo podes sumar puntos por equipo ganador
		} else if (matchResult.penalties && !result.penalties) {
			if (matchResult.penalty_local > matchResult.penalty_visitor) {
				winner = 'local';
			} else if (matchResult.penalty_visitor > matchResult.penalty_local) {
				winner = 'visitor';
			}

			if (
				(winner === 'local' && result.local > result.visitor) ||
				(winner === 'visitor' && result.visitor > result.local)
			) {
				succesMatch = true;
			}
		}
		//Si no hubo penales y lo marcaste, solo podes sumar puntos por equipo ganador
		else if (!matchResult.penalties && result.penalties) {
			if (matchResult.local > matchResult.visitor) {
				winner = 'local';
			} else if (matchResult.visitor > matchResult.local) {
				winner = 'visitor';
			}

			if (
				(winner === 'local' && result.penalty_local > result.penalty_visitor) ||
				(winner === 'visitor' && result.penalty_visitor > result.penalty_local)
			) {
				succesMatch = true;
			}
		}

		if (succesGoals) {
			points = 3;
		} else if (succesMatch) {
			points = 1;
		}

		let userPoints = await prisma.userPoints.findUnique({
			where: {
				userID: prediction.userID,
				tournamentID: tournamentID
			}
		});

		if (userPoints) {
			userPoints = await prisma.userPoints.update({
				where: {
					userID: userPoints.userID,
					tournamentID: userPoints.tournamentID
				},
				data: {
					points: userPoints.points + points
				}
			});
		} else {
			userPoints = await prisma.userPoints.create({
				data: {
					userID: prediction.userID,
					tournamentID: tournamentID,
					points: points
				}
			});
		}
	});
};
