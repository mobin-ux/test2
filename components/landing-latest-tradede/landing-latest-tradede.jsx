import { Fragment } from "react";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import css from "./landing-latest-traded.module.scss";
import { items } from "./data";
import Image from 'next/image'
const LandingLatestTradede = ({ url, title, price }) => {
  return (
    <Fragment>
      {items.map((el, idx) => (
        <div className={`w-full ${css.itemContainer}`} key={idx}>
          <div
            className={`${css.cover} border-4 border-payrue-home-blue`}
          ></div>
          <div className={`absolute bottom-0 right-0 ${css.itemContent}`}>
            <div className="relative w-full h-full bg-white">
              <Image
                src={el.url}
                layout='fill'
                alt=""
                className="absolute bottom-0 right-0 w-full h-full object-cover"
              />
              <span className="text-center flex items-center justify-center flex-col">
                <p className="text-payrue-black font-poppins text-2xl font-semibold mb-2">
                  {el.title}
                </p>
                <p className="text-payrue-home-blue font-poppins text-2xl font-normal">
                  {el.price} Matic
                </p>
              </span>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export { LandingLatestTradede };
