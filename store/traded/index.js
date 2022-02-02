
import { createEvent, createStore, createEffect } from 'effector';
import { createGate } from 'effector-react';

export const $traded = createStore([]);
export const fetchTradedFx = createEffect()
export const getTraded = createEvent()
export const tradedGate = createGate()