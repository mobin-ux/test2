import { useStore } from "effector-react";
import { useState } from "react";
import { Button, Modal } from "../..";
import { $address } from "../../../store/address";
import TransferConfirmationModal from "./transfer-confirmation-modal";
import PAYRUESTORE from "../../../abi/PAYRUESTORE.json";
import { $provider } from "../../../store/provider";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import axios from "axios";
import { backendUrl } from "../../../hooks/useAPI";
import { $session } from "../../../store/session";
import { useRouter } from "next/router";


const TransferAddressModal = ({ open, onClose, nft }) => {
  const router = useRouter();
  const session = useStore($session);
  const [toAddress, setToAddress] = useState("");
  const address = useStore($address);
  const provider = useStore($provider);
  const [loading, setLoading] = useState(false);
  const [transferConfirmationModal, setTransferConfirmationModal] =
    useState(false);
  const onSubmit = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      nft.contractAddress,
      PAYRUESTORE.abi,
      signer
    );
    setLoading(true);
    try {
      const tx = await contract.transferFrom(address, toAddress, nft.itemId,{
          from :address,
          gasLimit: 3500000,
      });
      await tx.wait();
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "NFT transfered successfully!",
        });
        onClose();
        router.push("/");
    } catch (error) {
        console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!, check address and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendToMarket = async (item) =>
    axios
      .post(
        `${backendUrl}/nfts/send-to-market`,
        {
          id: item.id,
          showInListings: true,
        },
        {
          headers: {
            session,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "NFT transfered successfully!",
        });
        onClose();
        router.push("/");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!, please try again",
        })
      )
      .finally(fetchData);

  const onCloseTransferConfirmationModal = () => {
    onClose();
    setTransferConfirmationModal(false);
  };
  return (
    <>
      <TransferConfirmationModal
        address={address}
        nft={nft}
        open={transferConfirmationModal}
        onClose={onCloseTransferConfirmationModal}
      />
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col items-center pt-2 pb-2 w-64 sm:w-144">
          <h3 className="text-2xl">Transfer your item</h3>

          <div className="flex flex-col gap-2 mt-8 w-full">
            <p>Address</p>
            <input
              className="w-full border rounded-xl px-2 py-2"
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <Button
            rounded
            fill
            onClick={onSubmit}
            loading={loading}
            className="mt-4 w-full"
          >
            Transfer
          </Button>
          {/* <button
            className="w-full bg-payrue-blue rounded-xl mt-4 py-3 text-white hover:text-payrue-blue hover:bg-blue-100  transition duration-200"
            onClick={onSubmit}
          ></button> */}
        </div>
      </Modal>
    </>
  );
};

export default TransferAddressModal;
