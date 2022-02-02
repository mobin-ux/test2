import { NftCard } from "../../components";
import { useStore } from "effector-react";
import { $nftsByCategory, getNftsByCategory } from "../../store/nfts/nfts";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withHelper } from "../../hooks/withHelper";

const CategoryPage = withHelper(({ buyNft }) => {
  const router = useRouter();
  const nfts = useStore($nftsByCategory);
  useEffect(() => {
    if (router.query.categoryId) {
      getNftsByCategory(router.query.categoryId);
    }
  }, [router.query]);

  if (nfts.length === 0)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;

  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="mx-2 lg:mt-20 md:mx-14"
        style={{ maxWidth: "1600px", width: "100%" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 pt-4">
          {nfts.map((nft, i) => (
            <NftCard key={i} {...nft} buyNft={buyNft} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default CategoryPage;
