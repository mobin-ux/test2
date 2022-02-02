import { useState } from "react";
import { Button, Modal, NftCard } from "../..";
import ListedModal from "./listed-modal";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import PAYRUESTORE from "../../../abi/PAYRUESTORE.json";
import PropelToken from "../../../abi/PropelToken.json";
import axios from "axios";
import { backendUrl } from "../../../hooks/useAPI";
import Swal from "sweetalert2";
import { useStore } from "effector-react";
import { $session } from "../../../store/session";

const propelTokenAddress = process.env.propelTokenAddress;

const SellModal = ({ nft, open, onClose }) => {
  const session = useStore($session);
  const [showListedModal, setShowListedModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("0");
  const onSubmit = async () => {
    setLoading(true);
    try {
      const { priceInPropel, contractAddress, id, itemId } = nft;
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      const contract = new ethers.Contract(
        contractAddress,
        PAYRUESTORE.abi,
        signer
      );
      const newPrice = ethers.utils.parseUnits(price, "ether");
      if (priceInPropel) {
        const propelContract = new ethers.Contract(
          propelTokenAddress,
          PropelToken.abi,
          signer
        );
        const commission =  (Number(newPrice) / 200).toString();

        const approval = await propelContract.approve(
          contractAddress,
          commission.toString(),
          {
            from: accounts[0],
            gasLimit: 3500000,
          }
        );

        await approval.wait();

        const transaction = await contract.resellTokenByPropel(
          itemId,
          newPrice.toString(),
          {
            from: accounts[0],
            gasLimit: 3500000,
          }
        );

        await transaction.wait();
      } else {
        const commission =  (Number(newPrice) / 100).toString();
        const transaction = await contract.resellToken(
          itemId,
          newPrice.toString(),
          {
            from: accounts[0],
            gasLimit: 3500000,
            value: commission.toString(),
          }
        );
        await transaction.wait();
      }

      await axios.post(
        `${backendUrl}/nfts/send-to-market`,
        {
          id,
          showInListings: true,
          price: newPrice.toString(),
        },
        {
          headers: {
            session,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "NFT transfered successfully!",
      });
      onClose();
      setShowListedModal(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ListedModal
        nft={nft}
        open={showListedModal}
        onClose={() => setShowListedModal(false)}
      />
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col items-center pt-2 pb-2">
          <h3 className="payrue-black text-2xl">Preview</h3>
          <NftCard {...nft} className="sm:mx-24" />
          <div className="flex mt-4 gap-2 self-start items-start flex-col px-4 w-full relative">
            <label>Price</label>
            <input
              className="h-14 pl-2 pr-8 border rounded-xl w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {nft.priceInPropel ? (
              <img
                className="absolute right-6 bottom-3 h-8"
                src="/img/propel.svg"
                alt="propel"
              />
            ) : (
              <img
                className="absolute right-6 bottom-3 h-8"
                src="/img/matic.svg"
                alt="matic"
              />
            )}
          </div>
          <div className="px-4 mt-4 w-full">
            <Button loading={loading} fill rounded onClick={onSubmit}>
              Complete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SellModal;
