export const setDate = (date: Date) => {
	const numbers = date.toLocaleDateString().split('/').reverse();
	const newNumbers: string[] = [];
	const regex = /^[1-9]$/;
	numbers.forEach((number) => {
		newNumbers.push(regex.test(number) ? `0${number}` : number);
	});
	return newNumbers.join('-');
};
