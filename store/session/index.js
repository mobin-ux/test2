import { createEvent, createStore } from "effector";

export const setSession = createEvent();

export const $session = createStore("");
