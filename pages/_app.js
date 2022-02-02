import "../styles/globals.scss";
import { Footer, Header } from "../layouts";
import Head from "next/head";
// import { setSession } from "../store/session";
import dynamic from "next/dynamic";
// import { setWeb3Modal } from "../store/web3Modal";
import Router from "next/router";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import { Loading } from "../components";
import { useEffect } from "react";
import { setLinks, setShowMoreLinks } from "../store/menu";
import { headerData } from "../layouts/header/data";
import "../store/init";
import { setWeb3Modal } from "../store/web3Modal";
import { setSession } from "../store/session";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
dynamic(() => import("nprogress/nprogress.css"));

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

if (typeof window !== "undefined") {
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
    },
  });
  setWeb3Modal(web3ModalInstance);
  setSession(window.sessionStorage.getItem("session"));
}

function Marketplace({ Component, pageProps, router }) {
  useEffect(() => {
    setLinks(headerData.links);
    setShowMoreLinks(true);
  }, [router.route]);

  return (
    <div>
      <Head>
        <title>Payrue NFT Marketplace</title>
        <meta
          property="og:title"
          content="Payrue NFT Marketplace"
          key="title"
        />
      </Head>
      <Header />
      <Loading />

      <Component {...pageProps} />

      <Footer />
    </div>
  );
}

export default Marketplace;
