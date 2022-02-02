import React, { useState, useEffect } from "react";
import { Dropdown, SellCanelNft, TransferNft } from "../../components";
import { getNft } from "../../store/nfts/nfts";
import { useRouter } from "next/router";
import Head from "next/head";
import { backendUrl } from "../../hooks/useAPI";
import axios from "axios";
import { useStore } from "effector-react";
import { $provider } from "../../store/provider";
import { withHelper } from "../../hooks/withHelper";
import Link from "next/link";
import Image from "next/image";
import { $address } from "../../store/address";
import { shortnererFunction } from "../../utils/shortnererFunction";
import { rgbDataURL } from "../../helpers/rgbDataUrl";
import { maticPropelPrice } from "../../helpers/utilities";
// import { backendUrl } from "../../hooks/useAPI";
const nftaddress = process.env.oldNftMarketContractAddress;

const InfoPage = withHelper(({ nft, buyNft }) => {
  if (!nft) return null;
  const router = useRouter();

  const provider = useStore($provider);
  const address = useStore($address);

  const options = [
    {
      img: "/img/message.svg",
      title: "Copy link",
      onClick: () => navigator.clipboard.writeText(window.location.href),
      // (window.location.href = `mailto:address@dmail.com?body=${window.location.href}`),
    },
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
          `http://www.twitter.com/intent/tweet?url=${
            window.location
          }&hashtags=${categories.map((category) => category.name).join(",")}`,
          "_blank"
        ),
    },
  ];

  const [image, setImage] = useState(nft?.image);

  useEffect(() => {
    if (nft?.fileName) {
     setImage(`${backendUrl}/uploads/nfts/${nft?.fileName}`);
    } else {
      setImage(nft?.image);
    }
  }, [nft]);

  const {
    name,
    categories = [],
    price,
    description,
    tokenId,
    contractAddress = "",
    priceInPropel,
    seller,
    showInListings,
  } = {
    ...nft,
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
        <meta property="og:image" content={image} />

        <meta
          property="twitter:url"
          content={`https://nft.payrue.com${router.asPath}`}
        />
        <meta
          property="twitter:title"
          content={`Payrue NFT Marketplace | ${name}`}
        />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>
      <div className="mx-2 lg:mt-20 md:mx-14">
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="flex-0.7 rounded-md overflow-hidden block w-full object-center h-full">
            <Image
              src={image}
              layout="responsive"
              width={"100%"}
              placeholder="blur"
              blurDataURL={rgbDataURL()}
              height={"100%"}
              onError={() => setImage("/img/thumbnail.jpg")}
              alt={name}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/*<button className="border-payrue-blue text-payrue-blue flex items-center border rounded-lg gap-1 p-1 pr-3.5 font-medium hover:bg-blue-100 hover:border-transparent transition duration-200">*/}
                {/*  <img*/}
                {/*    src={profile}*/}
                {/*    width="45"*/}
                {/*    height="45"*/}
                {/*    className="object-cover"*/}
                {/*    alt={fullName}*/}
                {/*  />*/}
                {/*  <p className="">{fullName}</p>*/}
                {/*</button>*/}
                {/*{session && (*/}
                {/*  <FavoriteIcon active={isLiked} onClick={() => likeNft()} />*/}
                {/*)}*/}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Link
                prefetch={false}
                href={`/collections/${nft?.collection?.id}`}
              >
                <a className="text-payrue-blue text-xl">
                  {nft?.collection?.name}
                </a>
              </Link>
            </div>
            <h3 className="mt-2 flex justify-between items-center font-semibold text-4xl text-payrue-black">
              {name}
              <div className="flex gap-1 items-start">
                <TransferNft nft={nft} />
                <Dropdown options={options}>
                  <button>
                    <img src="/img/share.svg" alt="share" />
                  </button>
                </Dropdown>
              </div>
            </h3>
            <div className="flex gap-14">
              {/*<p className="text-payrue-gray mt-7">{remaining}</p>*/}
              {/*<div className="text-payrue-gray mt-7 flex items-center gap-1">*/}
              {/*  <img src="/img/view-icon.svg" alt="views" className="-mt-0.5" />*/}
              {/*  <p>{views}</p>*/}
              {/*</div>*/}
            </div>
            <div className="mt-7 flex gap-2">
              {categories.map((category) => (
                <Link
                  prefetch={false}
                  href={`/categories/${category.id}`}
                  key={category}
                >
                  <a className="underline block text-payrue-gray">
                    #{category.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className="rounded-xl border-gray-300 w-full border mt-12">
              <p className="text-payrue-gray-60 py-3.5 pl-5 bg-payrue-blue-6 border-b">
                {/*Sale ends October 15, 2021*/}
              </p>
              <div className="px-5 py-4 flex flex-col gap-4">
                <p className="text-payrue-gray-60">Current price</p>
                <div className="flex items-center gap-1">
                  {priceInPropel ? (
                    <img width={14} src="/img/propel.svg" alt="propel" />
                  ) : (
                    <img width={14} src="/img/matic.svg" alt="matic" />
                  )}
                  <p className="font-bold text-payrue-black">
                    {maticPropelPrice(price, contractAddress)}{" "}
                  </p>
                  <span className="font-light text-payrue-black">
                    {priceInPropel ? "PROPEL" : "MATIC"}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-5">
                  {address && seller !== address && showInListings && (
                    <button
                      className="bg-payrue-blue flex w-full lg:w-52 items-center justify-center border border-transparent text-white rounded-xl gap-2 py-2 transition duration-200 hover:bg-blue-900"
                      onClick={() => buyNft(nft, provider)}
                    >
                      <img src="/img/wallet.svg" alt="wallet" />
                      BUY
                    </button>
                  )}
                  <SellCanelNft nft={nft} />

                  {/*<button className="text-payrue-blue w-full lg:w-52 border-payrue-blue border flex items-center justify-center text-white rounded-xl gap-2 py-2 transition duration-200 hover:bg-blue-100">*/}
                  {/*  <img src="/img/offer.svg" alt="wallet" />*/}
                  {/*  Make Offer*/}
                  {/*</button>*/}
                </div>
              </div>
            </div>
            <div className="rounded-xl border-gray-300 w-full border mt-12 h-full">
              <p className="text-payrue-black font-medium py-3.5 pl-5 bg-payrue-blue-6 border-b">
                Description
              </p>
              <div className="pl-5 py-4 flex flex-col gap-4">
                <p className="text-payrue-black opacity-80">{description}</p>
              </div>
            </div>
            <div className="rounded-xl border-gray-300 w-full border mt-12 h-full">
              <p className="text-payrue-black font-medium py-3.5 pl-5 bg-payrue-blue-6 border-b">
                Details
              </p>
              <div className="px-5 py-4 flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-payrue-black opacity-80">
                    Contact Address
                  </p>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="text-payrue-blue"
                    href={`https://polygonscan.com/address/${
                      contractAddress || nftaddress
                    }`}
                  >
                    {shortnererFunction(contractAddress || nftaddress)}
                  </a>
                </div>
                <div className="flex justify-between">
                  <p className="text-payrue-black opacity-80">Token ID</p>
                  <div rel="noreferrer">{tokenId}</div>
                </div>
                <div className="flex justify-between">
                  <p className="text-payrue-black opacity-80">Blockchain</p>
                  <div rel="noreferrer">Polygon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="mt-12 rounded-xl border-gray-300 w-full border overflow-hidden">*/}
        {/*  <p className="font-medium text-payrue-black py-7 px-8 bg-payrue-blue-6">*/}
        {/*    Trading History*/}
        {/*  </p>*/}
        {/*  <div className="overflow-auto">*/}
        {/*    <table className="table-auto w-full whitespace-nowrap">*/}
        {/*      <thead className="w-full">*/}
        {/*        <tr className="font-light text-left border-t border-b">*/}
        {/*          <th className="py-3.5 font-light px-8">Event</th>*/}
        {/*          <th className="py-3.5 font-light px-8">Price</th>*/}
        {/*          <th className="py-3.5 font-light px-8">From</th>*/}
        {/*          <th className="py-3.5 font-light px-8">To</th>*/}
        {/*          <th className="py-3.5 font-light px-8">Date</th>*/}
        {/*        </tr>*/}
        {/*      </thead>*/}
        {/*      <tbody className="w-full ">*/}
        {/*        {history.map((item, i) => (*/}
        {/*          <tr key={i} className="bg-transparent hover:bg-blue-50">*/}
        {/*            <td className="py-3 font-extralight px-8">{item.event}</td>*/}
        {/*            <td className="py-3 font-extralight px-8">*/}
        {/*              <div className="flex items-center gap-2">*/}
        {/*                <img*/}
        {/*                  width={14}*/}
        {/*                  height={14}*/}
        {/*                  src="/img/polygon-matic-logo.svg"*/}
        {/*                  alt="matic"*/}
        {/*                />*/}
        {/*                {item.price}*/}
        {/*              </div>*/}
        {/*            </td>*/}
        {/*            <td className="py-3 font-extralight text-payrue-blue px-8">*/}
        {/*              <span className="cursor-pointer">{item.from}</span>*/}
        {/*            </td>*/}
        {/*            <td className="py-3 font-extralight text-payrue-blue px-8">*/}
        {/*              <span className="cursor-pointer">{item.to}</span>*/}
        {/*            </td>*/}
        {/*            <td className="py-3 font-extralight px-8">{item.date}</td>*/}
        {/*          </tr>*/}
        {/*        ))}*/}
        {/*      </tbody>*/}
        {/*    </table>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="mt-12 rounded-xl border-gray-300 w-full border">*/}
        {/*  <p className="font-medium text-payrue-black py-7 px-8 bg-payrue-blue-6 border-b">*/}
        {/*    More NFT from{" "}*/}
        {/*    <span className="cursor-pointer text-payrue-blue">John Doe</span>*/}
        {/*  </p>*/}
        {/*  <div className="flex px-8 py-7">*/}
        {/*    <NftCard*/}
        {/*      price={0.35}*/}
        {/*      image="/img/Rectangle 4.png"*/}
        {/*      name="John doe"*/}
        {/*      description="Girl face"*/}
        {/*      onMoreClick={onMoreClick}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  );
});

export async function getStaticProps({ params }) {
  try {
    const { data } = await axios.get(`${backendUrl}/nfts/show/${params.id}`);
    return {
      props: {
        nft: {
          ...data.nft,
          collection:
            (data.collections || []).length > 0 ? data.collections[0] : null,
        },
      },
      revalidate: 60,
    };
  } catch {
    return { notFound: true, revalidate: 60 };
  }
}

export async function getStaticPaths() {
  const { data = [] } = await axios.get(`${backendUrl}/nfts`);

  return {
    paths: data.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: true,
  };
}

export default InfoPage;
