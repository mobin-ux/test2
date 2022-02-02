import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
const backendUrl = process.env.backendUrl;
import axios from "axios";
import { useStore } from "effector-react";
import { $session, setSession } from "../../store/session";
import { setProvider } from "../../store/provider";
import { withHelper } from "../../hooks/withHelper";

const chainId = process.env.chainId;
const ProfileConnect = withHelper(
  ({ show, login, className, closeSidebar = () => {} }) => {
    const router = useRouter();
    const session = useStore($session);

    const isVisible = show ? "flex" : "hidden";

    const toProfile = () => router.push("/profile");

    const onClick = useCallback(() => {
      closeSidebar();
      if (session) return toProfile();
      else return login();
    }, [session]);

    return (
      <div
        className={`${isVisible} cursor-pointer transition duration-200 rounded-md ${className}`}
        onClick={onClick}
      >
        <img
          src="/img/profile.svg"
          width="30"
          alt="profile"
          className={"mx-auto"}
        />
      </div>
    );
  }
);

ProfileConnect.defaultProps = {
  show: false,
  className: "",
};

export { ProfileConnect };
