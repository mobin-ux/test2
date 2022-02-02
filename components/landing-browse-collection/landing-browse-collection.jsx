import Link from "next/link";
import { Fragment } from "react";
import css from "./landing-browse-collection.module.scss";
import { items } from "./data";
import Image from "next/image";

const LandingBrowseCollection = () => {
  return (
    <Fragment>
      <div className="grid lg:grid-cols-3 grid-cols-1">
        {items.map((el, idx) => (
          <div
            className={`${css.item} relative flex justify-end mt-4 lg:mt-0`}
            key={idx}
          >
            <img
              src={el.avatar}
              className="absolute left-0 border-white z-10"
              alt=""
            />
            <div className="float-right">
              <img src={el.url} alt="" className="w-full" />
              <p className="mb-1 mt-2 text-payrue-black font-poppins font-semibold text-lg text-center">
                {el.title}
              </p>
              <p className={`font-poppins text-base ${css.by} text-center`}>
                by
                <span className="font-poppins font-semibold ml-1.5 text-payrue-home-blue">
                  {el.created}
                </span>
              </p>
              <p className={`${css.itemText} text-center mt-1`}>{el.text}</p>
            </div>
          </div>
        ))}
      </div>

      <span className="flex items-center justify-center">
        <Link href="#">
          <a className="text-center bg-transparent  mx-aut text-payrue-home-blue text-2xl cursor-pointer ">
            View More
          </a>
        </Link>
      </span>
    </Fragment>
  );
};

export { LandingBrowseCollection };
