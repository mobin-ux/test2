import { useState } from "react";
import { Modal } from "../..";
import { shortnererFunction } from "../../../utils/shortnererFunction";
import { backendUrl } from "../../../hooks/useAPI";
const TransferProcessedModal = ({ open, onClose, nft, address }) => {
  const [status, setStatus] = useState("failed");
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col items-center pt-2 pb-2">
          <h3 className="text-2xl">Your transfer has processed</h3>
          <img
            src={nft.image}
            alt={nft.name}
            className="w-52 h-52 object-cover mt-8"
          />
          <div className="rounded-xl border-gray-300 w-full border mt-12 h-full">
            <div className="flex  justify-between text-payrue-black font-medium py-3.5 px-5 bg-payrue-blue-6 border-b">
              <p className="">Status</p>
              <p>Transaction Hash</p>
            </div>

            <div className="px-5 py-4 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img
                  src={`/img/${status === "failed" ? "failed" : "success"}.svg`}
                  alt=""
                />
                <p>{status === "failed" ? "Failed" : "Success"}</p>
              </div>
              <p>{shortnererFunction("cx32a9123123123f15a")}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TransferProcessedModal;
