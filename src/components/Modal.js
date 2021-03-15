import './Modal.sass';

export default function ModalProduct({ onClose, children, blockScroll }) {
  return (
    <div className="Modal">
      <div
        className="Modal--overlay"
        onClick={() => {
          onClose();
          blockScroll();
        }}
      ></div>
      {children}
    </div>
  );
}
