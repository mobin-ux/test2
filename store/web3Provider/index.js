import { createEvent, createStore } from "effector";

export const setWeb3Provider = createEvent();

export const $web3Provider = createStore(null);
