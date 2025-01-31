import type { ObserverProps } from '$lib/types/utils';

/**
 * Fire callback once all fonts are loaded
 */
export const onFontsReady = (callback: () => void) => {
	document.fonts.ready.then(() => callback());
};

/**
 * Get scroll top
 *
 * @returns number
 */
export const getScrollTop = () => {
	return window.scrollY || document.documentElement.scrollTop;
};

/**
 * Custom IntersectionObserver
 *
 * @return IntersectionObserver
 */
export const observer = ({
	element,
	onShow,
	onHide,
	threshold = [],
	rootMargin = '0px 0px 0px 0px'
}: ObserverProps) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					onShow();
				} else {
					onHide?.();
				}
			});
		},
		{ threshold, rootMargin }
	);

	observer.observe(element);

	return observer;
};

/**
 * classes is an object :
 * {
 * 	'a': true,
 * 	'b': false,
 * 	'c': true,
 * }
 *
 * This will send the following array: ['a', 'c']
 *
 * @returns string[]
 */
export const classNames = (classes: { [name: string]: boolean | undefined }) => {
	const classNames: string[] = [];

	Object.keys(classes).forEach((name) => {
		if (classes[name]) {
			classNames.push(name);
		}
	});

	return classNames;
};
