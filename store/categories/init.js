import {
  $categories,
  $category,
  categoriesGate,
  changeCategory,
  deleteCategory,
  deleteCategoryFx,
  fetchCategoriesFx,
  getCategories,
  resetCategory,
  saveCategoryFx,
  updateCategory,
} from "./index";
import axios from "axios";
import { forward, sample } from "effector";
import { $session } from "../session";
const backendUrl = process.env.backendUrl;

fetchCategoriesFx.use(async () => {
  axios.defaults.headers.session = sessionStorage.getItem("session");
  const { data } = await axios.get(`${backendUrl}/categories`);
  return data;
});

deleteCategoryFx.use(async (categoryId) => {
  const { data } = await axios.delete(`${backendUrl}/categories/${categoryId}`);
  return data;
});

saveCategoryFx.use(async (data) => {
  const category = { ...data };
  if (category.id) {
    if (category.file) category.updateImage = true;
    else category.updateImage = false;
  }
  const formData = new FormData();
  Object.entries(category).forEach(([key, value]) => {
    if (value || value === false) formData.append(key, value);
  });
  if (category.id) {
    const { data } = await axios.put(
      `${backendUrl}/categories/${category.id}`,
      formData
    );
    return data;
  } else {
    const { data } = await axios.post(`${backendUrl}/categories`, formData);
    return data;
  }
});

$categories.on(fetchCategoriesFx.doneData, (_, categories) => categories);
$categories.on(deleteCategoryFx.done, (state, { params: categoryId }) => {
  const categories = [...state];
  const index = categories.findIndex(({ id }) => id === categoryId);
  if (index > -1) {
    categories.splice(index, 1);
  }
  return categories;
});
$categories.on(saveCategoryFx.doneData, (state, category) => {
  const categories = [...state];
  const index = categories.findIndex(({ id }) => id === category.id);
  if (index > -1) {
    categories[index] = { ...category };
  } else {
    categories.push(category);
  }
  return categories;
});

$category.on(changeCategory, (_, category) => category);
$category.on(resetCategory, () => null);

sample({
  source: $category,
  clock: updateCategory,
  target: saveCategoryFx,
});

forward({
  from: deleteCategory,
  to: deleteCategoryFx,
});

forward({
  from: saveCategoryFx.done,
  to: resetCategory,
});

forward({
  from: [getCategories, categoriesGate.open, $session],
  to: fetchCategoriesFx,
});
