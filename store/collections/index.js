import { createEffect, createEvent, createStore } from "effector";
import { createGate } from "effector-react";

export const collectionsGate = createGate();
export const getCollections = createEvent();
export const fetchCollectionsFx = createEffect();
export const $collections = createStore([]);

export const getCollection = createEvent();
export const fetchCollectionFx = createEffect();
export const $collection = createStore({
  nfts: [],
});

export const $cover = createStore(null);
export const changeCover = createEvent();
export const changeCoverFx = createEffect();

export const resetCollection = createEvent();
export const changeCollection = createEvent();
export const updateCollection = createEvent();
export const saveCollectionFx = createEffect();

export const $collectionLoading = createStore(false);
export const changeCollectionLoading = createEvent();

export const $createCollectionPopup = createStore(false);
export const changeCreateCollectionPopup = createEvent();

export const myCollectionsGate = createGate();
export const $myCollections = createStore([]);
export const getMyCollections = createEvent();
export const fetchMyCollectionsFx = createEffect();
