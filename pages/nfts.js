import { useCallback, useEffect, useState } from "react";
import { NftTable, Logout } from "../layouts";
import { useGate, useStore } from "effector-react";
import { $session } from "../store/session";
import { categoriesGate } from "../store/categories";
import { useRouter } from "next/router";

const tabs = [
  {
    title: "Purchased",
    img: "/img/purchased.svg",
  },
  {
    title: "Sold",
    img: "/img/sold.svg",
  },
  {
    title: "Minted",
    img: "/img/sold.svg",
  },
  {
    title: "Logout",
    img: "/img/logout.svg",
  },
];

const Nfts = () => {
  useGate(categoriesGate);
  const session = useStore($session);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/").then();
    }
  }, [session, router]);
  const [activeView, setActiveView] = useState("purchased");

  const renderView = useCallback(() => {
    if (session) {
      switch (activeView) {
        case "purchased":
          return <NftTable session={session} url="my-purchased-list" />;
        case "sold":
          return <NftTable session={session} url="my-sold-list" />;
        case "minted":
          return (
            <NftTable session={session} url="my-not-sold-list" showActions />
          );
        case "logout":
          return <Logout />;
        default:
          return <div className="text-center p-10">Select a tab</div>;
      }
    }
    // return <Logout />;
  }, [activeView, session]);

  return (
    <div className="flex flex-col lg:flex-row mx-2 md:mx-10 mt-10 gap-8">
      <div className="w-full flex flex-col sm:flex-row lg:w-2/12 bg-red lg:flex-col gap-4 justify-between lg:gap-0">
        <div className="my-4 flex flex-row justify-between lg:flex-col sm:flex-1">
          <ul className="border-b py-2 flex-1 lg:w-auto">
            {tabs.map((tab) => (
              <li key={tab.title}>
                <button
                  onClick={() => setActiveView(tab.title.toLowerCase())}
                  className={`text-left hover:bg-gray-100 w-full hover:text-black transition duration-200 p-2 flex items-center justify-between rounded ${
                    activeView === tab.title.toLowerCase()
                      ? "bg-payrue-blue  text-white"
                      : ""
                  }`}
                >
                  {tab.title}
                  <img width="20" src={tab.img} alt={tab.title} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                {renderView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nfts;
