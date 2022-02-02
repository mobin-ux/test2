import { createEvent, createStore } from "effector";

export const setWeb3Modal = createEvent();

export const $web3Modal = createStore(null);
