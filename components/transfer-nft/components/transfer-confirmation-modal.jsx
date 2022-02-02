import { useState } from "react";
import { Modal } from "../..";
import TransferProcessedModal from "./transfer-processed-modal";

const TransferConfirmationModal = ({ open, onClose, nft, address }) => {
  const [transferProcessedModal, setTransferProcessedModal] = useState(false);
  const onSubmit = () => {
    onClose();
    setTransferProcessedModal(true);
  };
  return (
    <>
      <TransferProcessedModal
        open={transferProcessedModal}
        onClose={() => setTransferProcessedModal(false)}
        nft={nft}
        address={address}
      />
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col items-center pt-2 pb-2">
          <h3 className="text-2xl">Transfer your item</h3>
          <p className="mt-8 text-payrue-gray">
            To complete your transfer, follow this steps
          </p>
          <div className="rounded-xl border-gray-300 w-full border mt-12 h-full">
            <p className="text-payrue-black font-medium py-3.5 pl-5 bg-payrue-blue-6 border-b">
              Transfer assets
            </p>
            <div className="px-5 py-4 flex flex-col gap-4">
              <p className="text-payrue-black opacity-80">
                Follow your wallet’s instruction to sumbit a transaction to
                transfer your assets
              </p>
              <button
                className="bg-payrue-blue rounded-xl mt-4 py-3 text-white hover:text-payrue-blue hover:bg-blue-100  transition duration-200"
                onClick={onSubmit}
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TransferConfirmationModal;
