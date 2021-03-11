import './GenericModal.sass';

export default function GenericModal({ children, title, isOpen, onClose }) {
  return (
    <div className="GenericModal">
      <div className="GenericModal--overlay"></div>

      <div className="GenericModal__content">
        <header>
          <p>Modal</p>
          <button type="button" onClick={() => onClose(false)}>
            X
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
