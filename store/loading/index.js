import { createEvent, createStore } from "effector";

export const setLoading = createEvent();
export const startLoading = createEvent();
export const stopLoading = createEvent();
export const $loading = createStore(false);
