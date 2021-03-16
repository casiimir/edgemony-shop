import './index.sass';

export default function ModalBodySidebar({ children, onClose }) {
  return (
    <div className="ModalBodySidebar">
      <div
        className="ModalBodySidebar--overlay"
        onClick={() => onClose()}
      ></div>
      {children}
    </div>
  );
}
