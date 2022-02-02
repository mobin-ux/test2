import {
  ClientOnly,
  Dropdown,
  NavLink,
  ProfileConnect,
  SearchInput,
} from "../../components";
import { headerData } from "./data";
import React, { useCallback, useEffect, useState } from "react";
import { Sidebar } from "../";
import Link from "next/link";
import { withHelper } from "../../hooks/withHelper";
import { useBreakpoints } from "../../hooks/useBreakpoints";
import { useStore } from "effector-react";
import { $profile } from "../../store/profile/profile";
import { $session } from "../../store/session";
import { $links, $logo, $showMoreLinks } from "../../store/menu";
import { useRouter } from "next/router";
import { $address } from "../../store/address";
import Image from "next/image";

const Header = withHelper(({ login }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDesktop } = useBreakpoints();
  const session = useStore($session);
  const address = useStore($address);
  const profile = useStore($profile);
  const handleCloseSidebar = useCallback(() => setSidebarOpen(false), []);
  const showMoreLinks = useStore($showMoreLinks);
  const links = useStore($links);
  const logo = useStore($logo);

  const router = useRouter();

  useEffect(() => {
    handleCloseSidebar();
  }, [router, handleCloseSidebar]);

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
      <nav className=" mx-2 md:mx-14 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center relative w-16 h-16">
            <Image
              layout="fill"
              alt="Payrue logo"
              className="object-cover"
              src={"/img/payrue-logo.png"}
              // width={"62px"}
            />
          </div>
          <div className="gap-2 ml-4 hidden lg:flex">
            {links
              .filter((item) => !item.mobile)
              .map((link) => (
                <NavLink key={link.title} {...link} />
              ))}
            {showMoreLinks && (
              <h3
                className="transition
                outline-none
        duration-200
        px-4
        py-1
        rounded-md
        inline-flex
        items-center
        text-gray-400
        hover:bg-blue-100
        hover:text-blue-600"
              >
                <Dropdown options={headerData.dao}>
                  <button>DAO</button>
                </Dropdown>
              </h3>
            )}
            {showMoreLinks && (
              <h3
                className="transition
                outline-none
        duration-200
        px-4
        py-1
        rounded-md
        inline-flex
        items-center
        text-gray-400
        hover:bg-blue-100
        hover:text-blue-600"
              >
                <Dropdown options={headerData.more}>
                  <button>More</button>
                </Dropdown>
              </h3>
            )}
          </div>
          <div className="flex items-center gap-4">
            <SearchInput />
            <ProfileConnect show={isDesktop} />
            {profile?.isAdmin && (
              <Link prefetch={false} href={"/admin"}>
                <a className="bg-payrue-blue block text-white rounded-lg py-2.5 px-6 hidden lg:flex">
                  Admin
                </a>
              </Link>
            )}
            <ClientOnly>
              <button
                className="text-center bg-payrue-home-blue text-sm text-white rounded-lg py-2 px-4 cursor-pointer"
                onClick={
                  address && session ? () => router.push("/profile") : login
                }
              >
                {address && session ? "Connected" : "Create"}
              </button>
            </ClientOnly>
          </div>

          <div
            className="w-10 visible lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <img src="/img/menu.svg" width="48" alt="Menu" />
          </div>
        </div>
      </nav>
    </>
  );
});
export { Header };
