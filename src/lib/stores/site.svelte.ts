import { writable } from 'svelte/store';

export const isTablet = writable(false);
export const mouse = writable([0, 0]);
export const windowWidth = writable(0);
export const windowHeight = writable(0);
