import { createEvent, createStore } from "effector";
import { createEffect } from "effector/effector.umd";
import { createGate } from "effector-react";

export const $profile = createStore(null);
export const profileGate = createGate();
export const getProfile = createEvent();
export const fetchProfileFX = createEffect();
