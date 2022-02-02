import { useStore } from "effector-react";
import { $session } from "../../store/session";
import Link from "next/link";
import Image from "next/image";
import { $provider } from "../../store/provider";
import { $address } from "../../store/address";
import { ClientOnly } from "..";
import { rgbDataURL } from "../../helpers/rgbDataUrl";
import { maticPropelPrice } from "../../helpers/utilities";

const NftCard = (props) => {
  const {
    image,
    name,
    description,
    priceInPropel,
    showInListings,
    price,
    buyNft,
    contractAddress,
    onMoreClick,
    id,
    txId,
    seller,
    className = "",
  } = props;
  const session = useStore($session);
  const provider = useStore($provider);
  const address = useStore($address);
  return (
    <div
      className={`mx-4 border p-2 rounded-2xl overflow-hidden relative each-slide h-full ${
        buyNft || onMoreClick ? "pb-12" : ""
      } ${className}`}
    >
      <Link prefetch={false} href={`/info/${id}`}>
        <a className="relative block overflow-hidden h-80 lg:h-56 w-full rounded-xl cursor-pointer">
          <Image
            src={image}
            layout="fill"
            className="object-cover "
            blurDataURL={rgbDataURL()}
            placeholder="blur"
            alt={name}
          />
          <div className="absolute left-0 top-0 bo bg-gradient-blue-to-white w-full h-full z-10" />
          <p className="absolute bottom-3 left-3 text-white font-medium text-lg z-20 truncate">
            {name}
          </p>
        </a>
      </Link>
      <div className="mt-2 flex justify-between">
        <p className="text-payrue-black overflow-ellipsis ellipsis-l-2">
          {description}
        </p>
        {/* <FavoriteIcon active={false} /> */}
      </div>
      <p className="mt-2 text-payrue-black">
        {maticPropelPrice(price, contractAddress)}{" "}
        {priceInPropel ? "PROPEL" : "MATIC"}
      </p>
      <div className="mt-2 absolute left-2 right-2 bottom-2">
        <ClientOnly>
          {session && buyNft && !txId && address !== seller &&  showInListings && (
            <button
              className="w-full bg-payrue-blue text-white font-normal py-1 px-12 rounded-2xl hover:bg-blue-200 hover:text-payrue-blue transition duration-200"
              onClick={() => buyNft(props, provider)}
            >
              Buy
            </button>
          )}
        </ClientOnly>

        {onMoreClick && (
          <Link prefetch={false} href={`/info/${id}`}>
            <a className="w-full block bg-payrue-blue text-white font-normal py-1 px-12 rounded-2xl hover:bg-blue-200 hover:text-payrue-blue transition duration-200">
              More
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export { NftCard };
