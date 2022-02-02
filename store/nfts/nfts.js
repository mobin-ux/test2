import { createEffect, createEvent, createStore } from "effector";
import { createGate } from "effector-react";

export const $nftsByCategory = createStore([]);
export const fetchNftsByCategoryFX = createEffect();
export const getNftsByCategory = createEvent();

export const $nfts = createStore([]);
export const fetchNftsFX = createEffect();
export const getNfts = createEvent();
export const nftsGate = createGate();

export const $nft = createStore(null);
export const fetchNftFx = createEffect();
export const getNft = createEvent();
export const likeNft = createEvent();
export const likeNftFx = createEffect();
