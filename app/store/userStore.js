import { writable } from 'svelte/store';

export const userToken = writable({'Token': null})
export const user = writable({'user': null})
