import { createEvent, createStore } from "effector";

export const setConnection = createEvent();

export const $connection = createStore(null);
