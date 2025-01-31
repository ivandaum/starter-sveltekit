import { get } from 'svelte/store';
import { windowWidth } from '$lib/stores/site.svelte';

import { breakpoints } from '$lib/constants';

export const isTouch = () => {
	const match = window.matchMedia('(pointer:coarse)');
	return match && match.matches;
};

export const isTablet = () => {
	return get(windowWidth) <= breakpoints.tablet;
};
