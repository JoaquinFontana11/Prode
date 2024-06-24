import { writeFileSync } from 'fs';

export const createUrlImg = (name: string = '', img: string, enviroment: string, type: string) => {
	const file = img;
	const fileName = name !== '' ? `${name}.png` : `${new Date().getTime()}.png`;
	const realPath =
		enviroment === 'development'
			? `static/img/${type}/${fileName}`
			: `/var/www/prode/static/img/${type}/${fileName}`;

	writeFileSync(realPath, file, 'base64');
	return `/img/${type}/${fileName}`;
};

export const createUrlIcon = (img: string, enviroment: string) => {
	const file = img;
	const fileName = `${new Date().getTime()}.png`;
	const realPath =
		enviroment === 'development'
			? `static/icons/${fileName}`
			: `/var/www/prode/static/icons/${fileName}`;
	writeFileSync(realPath, file, 'base64');
	return `/icons/${fileName}`;
};
