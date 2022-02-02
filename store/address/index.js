import { createEvent, createStore } from "effector";

export const setAddress = createEvent();

export const $address = createStore(null);
