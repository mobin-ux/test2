import { useBreakpoints } from "../../hooks/useBreakpoints";
import css from "./landing-banner.module.scss";
import Link from "next/link";
import Image from "next/image";

const LandingBanner = () => {
  const { isDesktop } = useBreakpoints();
  const classes = isDesktop ? css.bgDesktop : css.bgMobile;
  return (
    <div className={`px-2 md:px-14 py-3 w-full ${classes}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative">
          <div className="lg:pt-48 pt-0 pb-16 lg:py-44">
            <span className={css.matic}>
              <Image
                width="206px"
                height="206px"
                src="/img/polygon-matic-logo.png"
                alt="matic"
              />
            </span>
            <h1
              className="mx-0 font-semibold text-3xl lg:text-5xl sm:text-4xl text-payrue-black text-center lg:text-left font-poppins">
              Best Place to Collect, <br /> Buy and Sell NFT ASSETS
            </h1>

            <div className="mx-auto text-center lg:text-left lg:mx-14 mt-8 block lg:flex items-center lg:ml-0">
              <Link prefetch={false} href="/explore">
                <a className=" text-center bg-payrue-home-blue  text-white rounded-lg px-8 py-2 cursor-pointer">
                  Explore
                </a>
              </Link>
              <Link prefetch={false} href="/create-item">
                <a className="text-center border ml-8 border-payrue-home-blue bg-white text-payrue-home-blue rounded-lg px-8 py-2 cursor-pointer">
                  Create
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center  lg:justify-end ">
          <div
            className={`bg-white inline-flex flex-col mt-2 lg:mt-16 ${css.w77}`}
          >
            <div className={css.backgroudnImageCart}></div>
            <div className="bg-white flex py-29 px-26 justify-between items-center">
              <p className="text-payrue-black font-poppins text-2xl">Art</p>
              <Link prefetch={false} href="/john-doe">
                <a className="text-payrue-home-blue font-poppins text-2xl">
                  John Doe
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LandingBanner };
