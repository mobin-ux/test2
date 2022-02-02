import React, { useCallback, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { $provider, setProvider } from "../store/provider";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import { ethers } from "ethers";
import { nftaddress, nftmarketaddress } from "../config.example";
import { backendUrl } from "./useAPI";
import axios from "axios";
import { $session, setSession } from "../store/session";
import { $web3Modal } from "../store/web3Modal";
import { getNfts } from "../store/nfts/nfts";
import { startLoading, stopLoading } from "../store/loading";
import Swal from "sweetalert2";
import { setConnection } from "../store/connection";
import PAYRUESTORE from "../abi/PAYRUESTORE.json";
import PropelToken from "../abi/PropelToken.json";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import { setAddress } from "../store/address";
const propelTokenAddress = process.env.propelTokenAddress;
const oldNftMarketContractAddress = process.env.oldNftMarketContractAddress;

const withHelper = (Component) => {
  const WithHelper = (props) => {
    const router = useRouter();
    const provider = useStore($provider);
    const web3Modal = useStore($web3Modal);
    const [chainId, setChainId] = useState(137);
    const session = useStore($session);

    async function buyByMatic(nft) {
      try {
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          nft.contractAddress,
          PAYRUESTORE.abi,
          signer
        );
        const commission = Number(nft.price.toString()) / 200;
        const finalPrice = Number(nft.price.toString()) + commission;

        const tx = await contract.purchaseToken(nft.itemId, {
          from: accounts[0],
          value: finalPrice.toString(),
        });
        await tx.wait();
        return tx;
      } catch (error) {
        console.log(error);
      }
    }

    async function buyByPropel(nft) {
      try {
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          nft.contractAddress,
          PAYRUESTORE.abi,
          signer
        );
        const propelContract = new ethers.Contract(
          propelTokenAddress,
          PropelToken.abi,
          signer
        );
        const DIVIDER = Math.pow(10, 18);

        const commission = Number(nft.price.toString()) / 400;
        const price = Number(nft.price.toString()) + commission;

        const finalPrice = ethers.utils.parseUnits(
          (price / DIVIDER).toString(),
          "ether"
        );
        const approval = await propelContract.approve(
          nft.contractAddress,
          finalPrice.toString(),
          {
            from: accounts[0],
            gasLimit: 3500000,
          }
        );
        await approval.wait();
        const tx = await contract.purchaseTokenByPropel(nft.itemId, {
          from: accounts[0],
        });
        await tx.wait();
        return tx;
      } catch (error) {
        console.log(400)
        console.log(error);
      }
    }

    async function buyNft(nft) {
      try {
        if (!provider) {
          await login();
        }
        const accounts = await provider.listAccounts();
        if (!accounts) {
          await login();
        }
        const maticBalance = await provider.getBalance(accounts[0]);

        const signer = provider.getSigner();

        if (!signer) {
          await login();
        }

        const contract = new ethers.Contract(
          nftmarketaddress,
          Market.abi,
          signer
        );

        if(nft.contractAddress){
          const contract2 = new ethers.Contract(
              nft.contractAddress,
              PAYRUESTORE.abi,
              signer
          );
          const tokenMeta = await contract2.tokenMeta(nft.tokenId);
          const {sale} = tokenMeta;
          if(!sale){
            Swal.fire({
              icon: 'error',
              html: 'Something Wrong You can not Buy this Nft',
            });
            return;
          }
        }


        const propelContract = new ethers.Contract(
          propelTokenAddress,
          PropelToken.abi,
          signer
        );
        const propelBalance = await propelContract.balanceOf(accounts[0]);
        const DIVIDER = Math.pow(10, 18);
        let commission;
        let finalPrice;
        if (nft.contractAddress) {
          if (nft.priceInPropel) {
            commission = Number(nft.price.toString()) / 400;
            const tempPrice = Number(nft.price.toString()) + commission;

            finalPrice = ethers.utils.parseUnits(
              (tempPrice / DIVIDER).toString(),
              "ether"
            );
          } else {
            commission = Number(nft.price.toString()) / 200;
            const tempPrice = Number(nft.price.toString()) + commission;

            finalPrice = ethers.utils.parseUnits(
              (tempPrice / DIVIDER).toString(),
              "ether"
            );
          }
        } else {
          commission = 0;
          finalPrice = ethers.utils.parseUnits(nft.price, "ether");
        }

        const result = await Swal.fire({
          icon: "info",
          title: "Checkout",
          html: `
            <p>
              You are about to buy<br/> <b>${nft.name}</b> for <b>${
            nft.contractAddress
              ? Number(ethers.utils.formatEther(nft.price)).toFixed(4)
              : nft.price
          } ${nft.priceInPropel ? "PROPEL" : "MATIC"}</b>
            </p>
            <p>
              You have <b>${Number(
                ethers.utils.formatEther(maticBalance)
              ).toFixed(4)} MATIC</b>
            </p>
            <p>
              You have <b>${Number(
                ethers.utils.formatEther(propelBalance)
              ).toFixed(4)} PROPEL</b>
            </p>
             <p>
              Commission <b>${Number(
                ethers.utils.formatEther(
                  ethers.utils.parseUnits(
                    (commission / DIVIDER).toString(),
                    "ether"
                  )
                )
              ).toFixed(4)} ${nft.priceInPropel ? "PROPEL" : "MATIC"}</b>
            </p>
            <p>
              You will be charged <b>${ethers.utils.formatEther(finalPrice)} ${
            nft.priceInPropel ? "PROPEL" : "MATIC"
          }</b>
            </p>`,
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

       // startLoading();
        let tx;
        if (nft.contractAddress) {
          if (nft.priceInPropel) {
            tx = await buyByPropel(nft);
          } else {
            tx = await buyByMatic(nft);
          }
        } else {
          tx = await contract.createMarketSale(
            oldNftMarketContractAddress,
            nft.itemId,
            {
              value: (Number(nft.price) * DIVIDER).toString(),
              gasLimit: 250000,
            }
          );

          await tx.wait();
        }
        await axios.post(
          `${backendUrl}/nfts/buy-nft`,
          {
            tokenId: nft.contractAddress ? nft.itemId : nft.tokenId,
            txId: tx.hash,
          },
          {
            headers: {
              session: sessionStorage.getItem("session"),
            },
          }
        );
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `Congratulations you are now the owner of item “${nft.name}“`,
        }).then(() => {
          router.push("/");
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          html: error?.message || error,
        });
      } finally {
        getNfts();
        stopLoading();
      }
    }

    function subscribeProvider(provider) {
      if (!provider.on) {
        return;
      }

      provider.on("close", () => {
        window.sessionStorage.removeItem("session");
        setSession(null);
      });
      provider.on("accountsChanged", async (accounts) => {
        window.sessionStorage.removeItem("session");
        setSession(null);
      });
      provider.on("chainChanged", async (chainId) => {
        window.sessionStorage.removeItem("session");
        setSession(null);
      });

      provider.on("networkChanged", async (networkId) => {
        window.sessionStorage.removeItem("session");
        setSession(null);
      });
    }

    const toHex = (num) => {
      return "0x" + num.toString(16);
    };

    async function addNetwork() {
      const params = [
        {
          chainId: toHex(137),
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://polygon-rpc.com"],
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ];

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params,
      });
    }

    const login = useCallback(async function () {
      try {
        const connection = await web3Modal.connect();
        setConnection(connection);

        const provider = new ethers.providers.Web3Provider(connection);

        //startLoading();
        subscribeProvider(provider);
        console.log(provider);
        const { chainId: currentChainId } = await provider.getNetwork();


        const accounts = await provider.listAccounts();

        const registerationResponse = await axios.post(
          `${backendUrl}/wallets`,
          {
            address: accounts[0],
          }
        );

        const { validationMessage } = registerationResponse.data;
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);

        if (!session) {
          const signedValidationMessage = await signer.signMessage(
            validationMessage
          );
          const verificationResponse = await axios.post(
            `${backendUrl}/wallets/verify`,
            {
              address: accounts[0],
              signedValidationMessage,
            }
          );

          const { verified, session } = verificationResponse.data;
          if (!verified) {
            window.sessionStorage.removeItem("session");
            setSession(null);
            Swal.fire({
              icon: "error",
              html: "Verification failed",
            });
            // throw new Error("Verification failed");
          }
          window.sessionStorage.setItem("session", session);
          setSession(session);
          router.push('/');
        }

        setProvider(provider);
       
      } catch (error) {
        Swal.fire({
          icon: "error",
          html: error?.message || error,
        });
        // throw new Error(error);
      } finally {
        //stopLoading();
      }
    }, []);

    useEffect(() => {
      if (web3Modal?.cachedProvider) {
        login();
      }
    }, [login]);

    return <Component login={login} buyNft={buyNft} {...props} />;
  };
  WithHelper.displayName = `WithHelper(${
    Component.displayName || Component.name
  })`;
  return WithHelper;
};

export { withHelper };
