import Link from "next/link";
import Image from "next/image";
import { backendUrl } from "../../hooks/useAPI";
import { useState } from "react";
import { rgbDataURL } from "../../helpers/rgbDataUrl";

const CollectionCard = (props) => {
  const {
    logo,
    name,
    cover,
    description,
    price,
    buyNft,
    onMoreClick,
    collectionItems,
    id,
    itemId,
  } = props;
  const [coverImage, setCover] = useState(
    `${backendUrl}/uploads/collections/${cover}`
  );
  const handleErrorCover = () => {
    setCover("/img/cover-collection-card-placeholder.jpg");
  };
  const [logoImage, setLogo] = useState(
    `${backendUrl}/uploads/collections/${logo}`
  );
  const handleErrorLogo = () => {
    setLogo("/img/avatar.png");
  };

  return (
    <div className=" mx-4 border p-2 pb-12 rounded-2xl overflow-hidden relative each-slide h-full cursor-pointer flex flex-col">
      <div
        className="relative w-full h-32 object-cover overflow-hidden rounded-md"
        style={{ minWidth: 254 }}
      >
        <Image
          onError={handleErrorCover}
          layout="fill"
          className="absolute inset-0 object-cover"
          src={coverImage}
          blurDataURL={rgbDataURL()}
          placeholder="blur"
          alt=""
        />
      </div>
      <div className="relative w-16 h-16 -mt-8 flex justify-center mx-auto rounded-full overflow-hidden">
        <Image
          onError={handleErrorLogo}
          layout="fill"
          className="rounded-full object-cover z-0"
          src={logoImage}
          placeholder="blur"
          blurDataURL={rgbDataURL()}
          alt=""
        />
      </div>
      <h4 className="text-center text-payrue-black">{name}</h4>
      <p className="text-center text-payrue-black opacity-80 ellipsis-l-3">
        {description}
      </p>

      <Link prefetch={false} href={`/collections/${id}`}>
        <a
          className={
            "w-full block text-center bg-payrue-blue text-white py-2 absolute transition duration-200 hover:bg-blue-100 hover:text-payrue-blue rounded-none bottom-0 left-0"
          }
        >
          More
        </a>
      </Link>

      {/* <div className="mt-2 flex justify-between">
        <p className="text-payrue-black overflow-ellipsis ellipsis-l-2">
          {description}
        </p>
        <p className="text-payrue-black">{collectionItems.length}</p>
      </div>
      <p className="mt-2 text-payrue-black">{price} MATIC</p> */}
    </div>
  );
};

export { CollectionCard };
