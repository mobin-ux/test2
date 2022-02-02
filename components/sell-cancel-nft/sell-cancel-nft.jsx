import { useStore } from "effector-react";
import { useState } from "react";
import { $address } from "../../store/address";
import SellModal from "./components/sell-modal";

const SellCancelNft = ({ nft }) => {
  const address = useStore($address);
  const [sellModal, setSellModal] = useState(false);

  const onSell = () => {
    setSellModal(true);
  };

  const onCancel = () => {
    onSell();
  };

  return (
    <>
      <SellModal
        onClose={() => setSellModal(false)}
        open={sellModal}
        nft={nft}
      />

      {address && (nft.seller === address) && (
        <button
          onClick={onSell}
          className="text-payrue-blue w-full lg:w-52 border-payrue-blue border flex items-center justify-center rounded-xl py-2 transition duration-200 hover:bg-blue-100"
        >
          Sell
        </button>
      )}
      {/* {nft.seller === address && nft.showInListings && (
        <button
          onClick={onCancel}
          className="text-payrue-blue w-full lg:w-52 border-payrue-blue border flex items-center justify-center rounded-xl py-2 transition duration-200 hover:bg-blue-100 mt-5"
        >
          Cancel Listing
        </button>
      )} */}
    </>
  );
};

export { SellCancelNft };
