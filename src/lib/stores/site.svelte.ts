import { writable } from 'svelte/store';

export const isTablet = writable(false);
export const windowWidth = writable(0);
export const windowHeight = writable(0);
