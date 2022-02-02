import Link from "next/link";
import css from "./landing-latest-nfts.module.scss";
import { items } from "./data";
import Image from "next/image";

const LandingLatestNfts = () => {
  return (
    <div className="mt-8 md:mt-32 pt-8 md:pt-12 relative">
      <div
        className={`w-full ${css.highlight} absolute top-0 right-0 z-10`}
      ></div>
      <span className={`absolute z-20 ${css.blue}`}>
        <Image
          src="/img/line-latest-nfts-blue.png"
          alt=""
          width="571px"
          height="237px"
        />
      </span>
      <span className={` absolute z-20 ${css.yellow}`}>
        <Image
          width="571px"
          height="237px"
          src="/img/line-latest-nfts-yellow.png"
          alt=""
        />
      </span>
      <div className="relative z-30">
        <h3 className="font-poppins text-center mx-auto font-medium text-4xl text-payrue-black mb-8 md:mb-12">
          Latest NFTs
        </h3>
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 justify-items-center mx-auto ${css.container}`}
        >
          {items.map((el, idx) => (
            <div
              className={`${css.item} rounded-2xl w-full h-full bg-white`}
              key={idx}
            >
              <img src={el.image} className="rounded-t-2xl w-full" />
              <div>
                <p className="my-3 text-center font-poppins text-payrue-black text-lg font-normal">
                  {el.title}
                </p>
                <div className="flex items-center justify-between px-3 pb-4">
                  <p className="font-poppins text-payrue-black text-lg font-normal">
                    {el.price} MATIC
                  </p>
                  <Link href="#">
                    <a className="text-center bg-payrue-home-blue sm:text-sm text-white rounded-lg py-2 px-2 sm:px-4  cursor-pointer ">
                      Buy Now
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <span className="text-center flex items-center justify-center">
          <Link href="#">
            <a className=" bg-transparent mt-6 md:mt-12 text-payrue-home-blue text-2xl py-2 px-4 cursor-pointer ">
              View More
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export { LandingLatestNfts };
