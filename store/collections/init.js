import {
  $collection,
  $collections,
  $createCollectionPopup,
  changeCollection,
  changeCreateCollectionPopup,
  collectionsGate,
  fetchCollectionFx,
  fetchCollectionsFx,
  getCollection,
  getCollections,
  resetCollection,
  saveCollectionFx,
  updateCollection,
  fetchMyCollectionsFx,
  $myCollections,
  getMyCollections,
  myCollectionsGate,
  changeCoverFx,
  $cover,
  changeCover,
} from "./index";
import axios from "axios";
import { forward, sample } from "effector";
import { $loading, setLoading } from "../loading";
const backendUrl = process.env.backendUrl;

fetchCollectionsFx.use(async () => {
  axios.defaults.headers.session = sessionStorage.getItem("session");
  const { data } = await axios.get(`${backendUrl}/collections`);
  return data;
});

fetchMyCollectionsFx.use(async () => {
  axios.defaults.headers.session = sessionStorage.getItem("session");
  const { data } = await axios.get(`${backendUrl}/collections/my-collections`);
  return data;
});

fetchCollectionFx.use(async (id) => {
  axios.defaults.headers.session = sessionStorage.getItem("session");
  const { data } = await axios.get(`${backendUrl}/collections/${id}`);
  return data;
});

changeCoverFx.use(async (collection) => {
  axios.defaults.headers.session = sessionStorage.getItem("session");
  const formData = new FormData();
  formData.append("file", collection.cover);
  const { data } = await axios.put(
    `${backendUrl}/collections/update-cover/${collection.id}`,
    formData
  );
  return data;
});

saveCollectionFx.use(async (data) => {
  const collection = { ...data };
  const formData = new FormData();
  Object.entries(collection).forEach(([key, value]) => {
    if (value || value === false) formData.append(key, value);
  });
  if (collection.id) {
    const { data } = await axios.put(
      `${backendUrl}/collections/${collection.id}`,
      formData
    );
    return data;
  } else {
    const { data } = await axios.post(`${backendUrl}/collections`, formData);
    return data;
  }
});

$collections.on(fetchCollectionsFx.doneData, (_, collections) => collections);
$collection.on(fetchCollectionFx.doneData, (_, collection) => collection);
$collection.on(changeCollection, (_, collection) => collection);
$collection.on(resetCollection, () => ({ nfts: [] }));

sample({
  source: $loading,
  clock: saveCollectionFx.pending,
  fn: (loading, pending) => pending,
  target: setLoading,
});

$myCollections.on(
  fetchMyCollectionsFx.doneData,
  (_, collections) => collections
);

$myCollections.on(saveCollectionFx.doneData, (myCollections, collection) => [
  ...myCollections,
  collection,
]);

$createCollectionPopup.on(changeCreateCollectionPopup, (_, isOpen) => isOpen);
$createCollectionPopup.on(saveCollectionFx.done, () => false);
$cover.on(changeCover, (_, cover) => cover);

forward({
  from: [getCollections, collectionsGate.open],
  to: fetchCollectionsFx,
});

sample({
  source: $cover,
  clock: saveCollectionFx.doneData,
  fn: (cover, collection) => ({ ...collection, cover }),
  target: changeCoverFx,
});

forward({
  from: [getMyCollections, myCollectionsGate.open],
  to: fetchMyCollectionsFx,
});

forward({
  from: getCollection,
  to: fetchCollectionFx,
});

forward({
  from: saveCollectionFx.done,
  to: resetCollection,
});

sample({
  source: $collection,
  clock: updateCollection,
  target: saveCollectionFx,
});
