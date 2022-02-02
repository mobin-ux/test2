import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { setSession } from "../../store/session";
import { $web3Modal, setWeb3Modal } from "../../store/web3Modal";

// if (typeof window !== "undefined") {

// }

export default function Web3ModalInit({ children }) {
  const [mounted, setMounted] = useState(false);
  const web3Modal = useStore($web3Modal);
  useEffect(() => {
    const web3ModalInstance = new Web3Modal({
      cacheProvider: true,
      network: "matic",
      disableInjectedProvider: true,
      providerOptions: {
        "custom-metamask": {
          display: {
            logo: "/img/metamask-logo.svg",
            name: "MetaMask Wallet",
            description: "Connect to your MetaMask Wallet"
          },
          package: true,
          connector: async () => {
              let provider = null;
              if (typeof window.ethereum !== 'undefined') {
                  let providers = window.ethereum.providers;
                  provider = providers.find(p => p.isMetaMask);
                  try {
                      await provider.request({ method: 'eth_requestAccounts' });
                  } catch (error) {
                      throw new Error("User Rejected");
                  }
              } else {
                  throw new Error("No MetaMask Wallet found");
              }
              console.log("MetaMask provider", provider);
              return provider;
          }
      },
        walletlink: {
          package: WalletLink, 
          options: {
            appName: "Payrue Nft App", // Required
            infuraId: "6a38e41498d1463fa6606ca8b2772f6d",
            rpc: "https://polygon-rpc.com",
            chainId: 137,
            appLogoUrl: null,
            darkMode: true
          }
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "6a38e41498d1463fa6606ca8b2772f6d",
            rpc: {
              137: "https://polygon-rpc.com",
            },
            network: "matic",
            chainId: 137,
          },
        },
      }
    });
    setWeb3Modal(web3ModalInstance);
    setSession(window.sessionStorage.getItem("session"));
    setMounted(true); 
  }, []);

  // if (!mounted || !web3Modal) return null;

  return children;
}
