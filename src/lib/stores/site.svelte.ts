import { writable } from 'svelte/store';

export const tablet = writable(false);

export const windowWidth = writable(0);
export const windowHeight = writable(0);

export const mouse = writable([0, 0]);
