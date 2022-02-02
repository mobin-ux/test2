import { useStore } from "effector-react";
import { useState } from "react";
import { $address } from "../../store/address";
import TransferAddressModal from "./components/transfer-address-modal";

const TransferNft = ({ nft }) => {
  const [addressModal, setAddressModal] = useState(false);
  const address = useStore($address);

  return (
    <>
      <TransferAddressModal
        open={addressModal}
        nft={nft}
        onClose={() => setAddressModal(false)}
      />
      {nft.contractAddress &&
        address === nft.seller && (
          <button onClick={() => setAddressModal(true)}>
            <img src="/img/transfer.svg" alt="Transfer" title="Transfer" />
          </button>
        )}
    </>
  );
};

export { TransferNft };
