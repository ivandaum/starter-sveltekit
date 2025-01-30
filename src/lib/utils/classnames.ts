import { isString } from '$lib/utils/test';

export const classNames = () => {
	const classList: string[] = [];

	const add = (n: string) => classList.push(n);

	const validate = (prop: any, className: string | null, fallback: string = '') => {
		if (!prop) return;

		if (isString(prop) && className) {
			add(className);
		} else if (fallback) {
			add(fallback);
		}
	};

	return { add, validate, classList };
};
