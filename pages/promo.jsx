import React from "react";
import Link from "next/link";

const data = {
  banner: {
    title: "PayRue NFT Marketplace",
    description: "1000 Limited Edition of PayRue Penguin",
    listTitle: "To own a limited PayRue Penguin Edition gives rights",
    listItems: ["Share of revenue", "PayRue DAO Member", "Priority "],
    // listFooter: "Sound good.",
    // linkTitle: "More info",
    linkHref: "",
  },
  middle:
    "PayRue Penguin Rights are unique NFT and define ownership of an asset with rights and claims to PayRue NFT Marketplace and PayRue DAO",
  footer: {
    listTitle: "Ownership of PayRue Limited Penguin edition, explained",
    listItems: [
      "Total of 1000 PayRue Limited Penguins will be created",
      "Each Penguin have different traits and are numbered from 1-1000 with a PayRue logo",
      "Each PayRue Penguin holds the right to 0.01% of the revenue generated in PayRue NFT Marketplace",
      "A total of 10% of PayRue NFT revenue will be distributed to PayRue Penguin Limited Edition holders",
      "Owners of PayRue Pinguin are members PayRue DAO",
      "The Limited Penguins will have priority on any NFT or Token airdrop",
      "Staking will be introduced for PayRue Penguin Limited holders",
    ],
    linkTitle: "View & Buy Limited Penguin Collection",
    linkHref: "/collections/17",
  },
};

const PromoPage = () => {
  return (
    <div className="mx-2 md:mx-14 py-3 gap-36 flex-col flex">
      <div className="flex flex-col-reverse md:flex-row sm:justify-between items-center gap-4">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-5xl font-semibold text-payrue-black">
            {data.banner.title}
          </h1>
          <h2 className="text-payrue-black opacity-80 text-4xl font-normal mt-3">
            {data.banner.description}
          </h2>
          <p className="text-payrue-black text-opacity-50 font-normal text-xl mt-4">
            {data.banner.listTitle}
          </p>

          <div className="flex flex-col mt-2 gap-1">
            {data.banner.listItems.map((item, index) => (
              <div className="flex items-center gap-1" key={index}>
                <span className="block w-5 h-5 bg-payrue-blue rounded-xl" />
                <p className="text-xl text-payrue-black font-normal text-opacity-50">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2 flex">
            {data.banner.listFooter}
            &nbsp;
            <a href={data.banner.linkHref} className="text-payrue-blue">
              {data.banner.linkTitle}
            </a>
          </div>
        </div>
        <div className="w-full h-auto md:w-144 md:h-144 overflow-hidden rounded-2xl">
          <img src="/img/penguin.png" alt="Payrue Penguin" />
        </div>
      </div>
      <div className="relative h-72 flex items-center justify-center">
        <img
          src="/img/Rectangle 13.png"
          alt="Penguin"
          className="absolute w-full"
        />
        <p className="font-semibold text-payrue-black text-4xl max-w-5xl text-center">
          {data.middle}
        </p>
      </div>
      <div className="">
        <p className="text-payrue-black font-medium text-3xl mt-4">
          {data.footer.listTitle}
        </p>

        <div className="flex flex-col mt-4 gap-1">
          {data.footer.listItems.map((item, index) => (
            <div className="flex  itemss-center gap-1.5" key={index}>
              <span className="w-6 h-6 bg-payrue-blue rounded-xl text-white flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-xl text-payrue-black font-normal flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center flex justify-center mt-20 mb-16">
          <Link prefetch={false} href={data.footer.linkHref}>
            <a className="text-payrue-blue font-semibold text-2xl">
              {data.footer.linkTitle}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PromoPage;
