import { isString, isBool } from '$lib/utils/test';

// TODO
// prop is boolean -> show something
// prop is string -> show prop or concat

/**
 * If prop is boolean and true, return fallback if exists (else return className)
 * If prop is string, return className (assuming className is built with prop concat)
 */
export const classNames = (prop: any, className: string | null = null, fallback: string = '') => {
	if (isBool(prop) && prop) {
		return fallback || className;
	} else if (isString(prop)) {
		return className;
	}

	return '';
};
