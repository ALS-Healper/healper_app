import { readable } from "svelte/store";

export const authHeaders = readable({
    "Content-Type": "application/json",
    "Authorization": null
});

export const baseHeaders = readable({
    "Content-Type": "application/json",
}); 