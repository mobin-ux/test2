import { createEvent, createStore } from "effector";

export const setProvider = createEvent();

export const $provider = createStore(null);
