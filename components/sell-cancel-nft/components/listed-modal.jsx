import { Modal } from "../..";
import { backendUrl } from "../../../hooks/useAPI";

const options = [
  {
    img: "/img/message.svg",
    title: "Copy link",
    onClick: () => navigator.clipboard.writeText(window.location.href),
    // (window.location.href = `mailto:address@dmail.com?body=${window.location.href}`),
  },
  {
    img: "/img/facebook.svg",
    title: "Share on Facebook",
    onClick: () =>
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
        "_blank"
      ),
  },
  {
    img: "/img/twitter.svg",
    title: "Share to Twitter",
    onClick: () =>
      window.open(
        `http://twitter.com/share?text=Check out this listing on PayRue NFT&url=${
          window.location
        }&hashtags=${categories.map((category) => category.name).join(",")}`,
        "_blank"
      ),
  },
];

const ListedModal = ({ nft, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center pt-2 pb-2 px-4 sm:px-10">
        <h3 className="payrue-black text-2xl">Your NFT is Listed</h3>
        <img src={nft.image} className="w-52 mt-4 h-52 object-fit" alt="" />
        <p className="mt-4 text-payrue-gray">Share</p>
        <div className="flex gap-2 mt-2">
          <button onClick={options[2].onClick}>
            <img src="/img/twitter.svg" width={42} alt="twitter" />
          </button>
          <button onClick={options[1].onClick}>
            <img src="/img/facebook.svg" width={42} alt="facebook" />
          </button>
          <button onClick={options[0].onClick}>
            <img src="/img/message.svg" width={42} alt="message" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ListedModal;
