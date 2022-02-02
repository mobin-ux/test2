import {
  $nft,
  $nftsByCategory,
  fetchNftsByCategoryFX,
  fetchNftFx,
  getNft,
  getNftsByCategory,
  likeNft,
  likeNftFx,
  $nfts,
  fetchNftsFX,
  nftsGate,
  getNfts,
} from "./nfts";
import { forward, sample } from "effector";
import axios from "axios";

const backendUrl = process.env.backendUrl;

fetchNftsFX.use(async () => {
  const { data } = await axios.get(`${backendUrl}/nfts`);
  return data;
});

fetchNftsByCategoryFX.use(async (categoryId) => {
  const { data } = await axios.get(
    `${backendUrl}/nfts/show-by-category/${categoryId}`
  );
  return data;
});

fetchNftFx.use(async (nftId) => {
  const { data } = await axios.get(`${backendUrl}/nfts/show/${nftId}`);
  return data;
});

likeNftFx.use(async (nft) => {
  const { data } = await axios.put(
    `${backendUrl}/nfts/${nft.isLiked ? "dislike" : "like"}/${nft.id}`
  );
  return data;
});

$nfts.on(fetchNftsFX.doneData, (_, nfts) => nfts);
$nftsByCategory.on(fetchNftsByCategoryFX.doneData, (_, nfts) => nfts);
$nft.on(fetchNftFx.doneData, (_, nft) => nft);
$nft.on(likeNftFx.done, (state) => {
  const nft = { ...state };
  nft.isLiked = !nft.isLiked;
  return nft;
});

forward({
  from: nftsGate.open,
  to: fetchNftsFX,
});

forward({
  from: getNfts,
  to: fetchNftsFX,
});

forward({
  from: getNft,
  to: fetchNftFx,
});

forward({
  from: getNftsByCategory,
  to: fetchNftsByCategoryFX,
});

sample({
  source: $nft,
  clock: likeNft,
  target: likeNftFx,
});
