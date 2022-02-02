import { createEvent, createStore } from "effector";

export const setChainId = createEvent();

export const $chainId = createStore(137);
