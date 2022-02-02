import { createEffect, createEvent, createStore } from "effector";
import { createGate } from "effector-react";

export const categoriesGate = createGate();
export const getCategories = createEvent();
export const fetchCategoriesFx = createEffect();
export const deleteCategory = createEvent();
export const deleteCategoryFx = createEffect();
export const $categories = createStore([]);

export const $category = createStore(null);
export const resetCategory = createEvent();
export const changeCategory = createEvent();
export const updateCategory = createEvent();
export const saveCategoryFx = createEffect();
