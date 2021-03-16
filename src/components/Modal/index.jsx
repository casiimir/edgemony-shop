import './index.sass';

export default function ModalProduct({ onClose, children }) {
  return (
    <div className="Modal">
      <div
        className="Modal--overlay"
        onClick={() => {
          onClose();
        }}
      ></div>
      {children}
    </div>
  );
}
