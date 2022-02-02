import ReactModal from "react-modal";
import { AnimatedModalChildContainer } from "../../styled/AnimatedModalChildContainer";

const Modal = ({ open, onClose, children }) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={300}
      style={MODAL_STYLE}
    >
      <AnimatedModalChildContainer
        isOpen={open}
        className="modal-body relative"
      >
        {children}
        <button onClick={onClose} className="absolute top-4 right-4 w-8">
          <img src="/img/close.svg" alt="close" />
        </button>
      </AnimatedModalChildContainer>
    </ReactModal>
  );
};

const MODAL_STYLE = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    zIndex: 10,
    backdropFilter: "blur(14px)",
    background: "#B4CBFF42",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
  },
  content: {
    inset: "unset",
    // margin: "100px auto",
    border: 0,
    background: "transparent",
  },
};

export { Modal };
