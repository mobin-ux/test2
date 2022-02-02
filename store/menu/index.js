import { createEvent, createStore } from "effector";

export const setLinks = createEvent();
export const $links = createStore([]);

export const $showMoreLinks = createStore(false);
export const setShowMoreLinks = createEvent();

export const $logo = createStore({});
export const setLogo = createEvent();
