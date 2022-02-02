import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useStore } from "effector-react";
import { setSession, $session } from "../../store/session";
import { $web3Modal } from "../../store/web3Modal";
import { $provider, setProvider } from "../../store/provider";
import { setAddress } from "../../store/address";
import { setChainId } from "../../store/chainId";

const backendUrl = process.env.backendUrl;
const Logout = () => {
  const session = useStore($session);
  const router = useRouter();
  const web3Modal = useStore($web3Modal);
  const provider = useStore($provider);

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      window.sessionStorage.clear();
      window.localStorage.clear();
      setProvider(null);
      setAddress(null);
      setChainId(137);

      setSession(null);
    },
    [provider]
  );

  useEffect(() => {
    axios
      .post(
        `${backendUrl}/wallets/logout`,
        {},
        {
          headers: {
            session,
          },
        }
      )
      .finally(() => {
        disconnect();
        return router.push("/");
      });
  }, [session]);
  return <div />;
};

export { Logout };
