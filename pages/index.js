import {
  CollectionCard,
  LandingBanner,
  LandingLatestTradede,
  LandingLatestNfts,
  LandingBrowseCollection,
} from "../components";
import { BrowseByCategory } from "../layouts";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useBreakpoints } from "../hooks/useBreakpoints";
import { useEffect, useState } from "react";
import { withHelper } from "../hooks/withHelper";
import { backendUrl } from "../hooks/useAPI";
import axios from "axios";
import Link from "next/link";
export default withHelper(function Home({
  buyNft,
  nfts = [],
  collections = [],
  categories = [],
}) {
  // useGate(nftsGate);
  // useGate(collectionsGate);
  // const nfts = useStore($nfts);
  // const collections = useStore($collections);
  const [properties, setProperties] = useState({
    duration: 5000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    indicators: true,
    canSwipe: true,
    pauseOnHover: true,
    arrows: true,
    infinite: false,
    characters: 60,
  });
  const { isMobile, isTablet, isDesktop } = useBreakpoints();

  useEffect(() => {
    if (isMobile) {
      if (properties.slidesToShow !== 1) {
        setProperties({
          ...properties,
          autoplay: true,
          indicators: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          characters: 60,
        });
      }
    }
    if (isTablet) {
      if (properties.slidesToShow !== 2) {
        setProperties({
          ...properties,
          autoplay: true,
          indicators: true,
          slidesToShow: 2,
          arrows: true,
          slidesToScroll: 2,
          characters: 60,
        });
      }
    }
    if (isDesktop) {
      if (properties.slidesToShow !== 4) {
        setProperties({
          ...properties,
          autoplay: true,
          indicators: true,
          arrows: true,
          slidesToShow: 4,
          slidesToScroll: 4,
          characters: 60,
        });
      }
    }
  }, [isMobile, isTablet, isDesktop, properties]);

  if (nfts.length === 0)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <div className="flex justify-center flex-col overflow-x-hidden ">
      <LandingBanner />
      <div
        className="mx-auto mt-4 px-0 lg:mt-20 md:px-14 flex flex-col gap-8"
        style={{ maxWidth: "1600px", width: "100%" }}
      >
        <h3 className="font-poppins mx-auto font-medium text-4xl text-payrue-black md:mb-12">
          Latest Traded
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
          <LandingLatestTradede />
        </div>

        <LandingLatestNfts />
        <h3 className="mx-auto font-medium text-4xl text-payrue-black text-center md:mt-32 md:mb-12">
          Browse Collections
        </h3>
        
          <LandingBrowseCollection />

        <BrowseByCategory
          categories={categories}
          properties={properties}
          key={properties.slidesToShow * 333}
        />
      </div>
    </div>
  );
});
//
export async function getServerSideProps() {
  const [{ data: nfts }, { data: collections }, { data: categories }] =
    await Promise.all([
      await axios.get(`${backendUrl}/nfts`),
      await axios.get(`${backendUrl}/collections`),
      await axios.get(`${backendUrl}/categories`),
    ]);
  // const { data } = await axios.get(`${backendUrl}/nfts`);
  // const { data } = await axios.get(`${backendUrl}/collections`);
  return { props: { nfts, collections, categories } };
}
