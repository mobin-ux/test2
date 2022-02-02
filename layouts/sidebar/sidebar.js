import { useEffect, useRef } from "react";
import Link from "next/link";
import { headerData } from "../header/data";
import { Dropdown, ProfileConnect } from "../../components";
import { Collpase } from "../../components/collapse/Collapse";

const links = [];

const Sidebar = ({ open, onClose }) => {
  const container = useRef();
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (open) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "unset";
    }
  }, [open]);
  useEffect(() => {
    function iOS() {
      return [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform);
    }
    setTimeout(() => {
      if (iOS()) {
        container.current.classList.add("bg-white");
      } else {
        container.current.classList.add("backdrop-filter");
        container.current.classList.add("backdrop-blur");
      }
    }, 100);
  }, [open]);
  const isOpen = open ? "w-full" : "w-0";
  return (
    <div
      ref={container}
      className={`h-full fixed z-10 top-0 left-0 overflow-x-hidden duration-500 pt-20 text-center ${isOpen}`}
    >
      <ProfileConnect closeSidebar={onClose} show className="pb-5 border-b" />
      <div className="flex flex-col gap-2 mt-5">
        {[
          ...links,
          ...headerData.links.filter((c) => c.title !== "Help"),
          {
            title: "DAO",
            children: [...headerData.dao],
          },

          {
            title: 'More',
            children: [...headerData.more]
          },
        ].map((link, index) => (
          <>
            {link.onClick ? (
              <a
                key={index}
                className="text-lg py-2"
                onClick={link.onClick}
                rel="noreferrer"
                target={"_blank"}
              >
                {link.title}
              </a>
            ) : link.children ? (
              <Collpase title={link.title}>
                <>
                  {link.children.map((child, index) => (
                    <a
                      key={index}
                      className="text-lg py-2"
                      onClick={child.onClick}
                      rel="noreferrer"
                      target={"_blank"}
                    >
                      {child.title}
                    </a>
                  ))}
                </>
              </Collpase>
            ) : (
              <Link prefetch={false} key={index} href={link.href}>
                <a onClick={onClose} className="text-lg py-2">
                  {link.title}
                </a>
              </Link>
            )}
          </>
        ))}
      </div>
      <button onClick={onClose} className="absolute top-6 right-1">
        <img src="/img/close.svg" alt="Close" width="48" />
      </button>
    </div>
  );
};

Sidebar.defaultProps = {
  open: false,
  onClose: () => undefined,
};

export { Sidebar };
