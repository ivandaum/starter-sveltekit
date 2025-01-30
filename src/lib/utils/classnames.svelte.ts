import { isString, isBool } from '$lib/utils/test';

// TODO
// prop is boolean -> show something
// prop is string -> show prop or concat

/**
 * Return the chosen className if prop exists
 * Else return fallback if exists
 * Else return prop itself
 */
export const classNames = (prop: any, className: string | null = null, fallback: string = '') => {
	if (isBool(prop) && prop) {
		return fallback || className;
	} else if (isString(prop)) {
		return className;
	}

	return '';
};
