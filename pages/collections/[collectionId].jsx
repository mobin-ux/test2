import { Dropdown, NftCard } from "../../components";
import { withHelper } from "../../hooks/withHelper";
import { backendUrl } from "../../hooks/useAPI";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useGate, useStore } from "effector-react";
import {
  $myCollections,
  changeCollection,
  myCollectionsGate,
  resetCollection,
} from "../../store/collections";
import { CreateCollectionPopup } from "../../components";
import { useEffect, useState } from "react";
import { rgbDataURL } from "../../helpers/rgbDataUrl";
const options = [
  {
    img: "/img/message.svg",
    title: "Copy link",
    onClick: () => navigator.clipboard.writeText(window.location.href),
    // (window.location.href = `mailto:address@dmail.com?body=${window.location.href}`),
  },
  // {
  //   img: "/img/message.svg",
  //   title: "Share by message  ",
  //   onClick: () => navigator.clipboard.writeText(window.location.href),
  // },
  {
    img: "/img/facebook.svg",
    title: "Share on Facebook",
    onClick: () =>
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        "_blank"
      ),
  },
  {
    img: "/img/twitter.svg",
    title: "Share to Twitter",
    onClick: () =>
      window.open(
        `http://twitter.com/share?text=Check out this listing on PayRue NFT&url=${window.location}`,
        "_blank"
      ),
  },
];
const CategoryPage = withHelper(({ buyNft, data }) => {
  if (!data) return null;
  const { collection = {}, nftList = [] } = data;
  useGate(myCollectionsGate);
  const myCollections = useStore($myCollections);
  useEffect(() => {
    changeCollection(collection);
    () => {
      resetCollection();
    };
  }, [collection]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  const {
    id,
    name,
    description,
    logo,
    cover,
    collectionItems = [],
  } = collection;

  const logoUrl = `${backendUrl}/uploads/collections/${logo}`;
  const coverUrl = `${backendUrl}/uploads/collections/${cover}`;

  const [coverImage, setCover] = useState(coverUrl);
  const handleErrorCover = () => {
    setCover("/img/cover-collection-card-placeholder.jpg");
  };
  const [logoImage, setLogo] = useState(logoUrl);
  const handleErrorLogo = () => {
    setLogo("/img/avatar.png");
  };

  return (
    <>
      <Head>
        <meta name="title" content={`${name} - PayRue`} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://nft.payrue.com${router.asPath}`}
        />
        <meta
          property="og:title"
          content={`Payrue NFT Marketplace | ${name}`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logoUrl} />

        <meta
          property="twitter:url"
          content={`https://nft.payrue.com${router.asPath}`}
        />
        <meta
          property="twitter:title"
          content={`Payrue NFT Marketplace | ${name}`}
        />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={logoUrl} />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex justify-center flex-col">
        <CreateCollectionPopup
          open={isPopupOpen}
          onClose={() => setPopupOpen(false)}
        />
        <div className="flex items-center flex-col">
          <div className="w-full h-96 relative">
            <Image
              src={coverImage}
              onError={handleErrorCover}
              placeholder="blur"
              blurDataURL={rgbDataURL()}
              layout="fill"
              className="object-cover"
              alt="banner"
            />
          </div>

          <div className="relative w-32 h-32 sm:w-44 sm:h-44 -mt-10 sm:-mt-20">
            <Image
              src={logoImage}
              onError={handleErrorLogo}
              placeholder="blur"
              blurDataURL={rgbDataURL()}
              layout="fill"
              className="rounded-full object-cover"
              alt="avatar"
            />
          </div>

          <div className="flex sm:items-center mx-auto gap-4 mt-14">
            <h1 className="text-4xl sm:text-6xl text-center text-payrue-black">
              {name}
            </h1>
            <div className="mx-auto flex items-start gap-2 ">
              {/* {myCollections.find((collection) => collection.id === id) && (
                <button onClick={() => setPopupOpen(true)}>
                  <img width="40" src="/img/edit.svg" alt="" />{" "}
                </button>
              )} */}
              <Dropdown options={options}>
                <button>
                  <img src="/img/share.svg" alt="share" />
                </button>
              </Dropdown>
            </div>

            {/* </div> */}
          </div>

          <p className="w-72 mt-14 text-center text-payrue-gray">
            {description}
          </p>
          <div className="rounded-lg flex border border-payrue-gray-60 mt-14">
            <div className="w-32 sm:w-48 py-1 flex flex-col items-center gap-0.5">
              <h4 className="text-payrue-black">{collectionItems.length}</h4>
              <p className="text-payrue-gray">NFTs</p>
            </div>
            {/*<div className="bg-payrue-gray-60 w-px" style={{ height: 60 }} />*/}
            {/*<div className="w-32 sm:w-48 py-1 flex flex-col items-center gap-0.5">*/}
            {/*  <h4 className="text-payrue-black">8</h4>*/}
            {/*  <p className="text-payrue-gray">Owners</p>*/}
            {/*</div>*/}
          </div>
        </div>
        <div
          className="mx-auto px-2 lg:mt-20 md:px-14"
          style={{ maxWidth: "1600px", width: "100%" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 pt-4">
            {nftList.map((nft, i) => (
              <NftCard key={i} {...nft} buyNft={buyNft} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

export async function getStaticProps({ params }) {
  try {
    const { data } = await axios.get(
      `${backendUrl}/collections/collection/${params.collectionId}`
    );
    if (data.collection) {
      return { props: { data }, revalidate: 60 };
    }
    return { notFound: true, revalidate: 60 };
  } catch {
    return { notFound: true, revalidate: 60 };
  }
}

export async function getStaticPaths() {
  const { data = [] } = await axios.get(`${backendUrl}/collections`);
  return {
    paths: data.map(({ id }) => ({
      params: { collectionId: id.toString() },
    })),
    fallback: true,
  };
}

export default CategoryPage;
