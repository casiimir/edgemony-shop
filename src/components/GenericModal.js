import './GenericModal.sass';

export default function GenericModal({ children, title, isOpen, onClose }) {
  return (
    <div className="GenericModal">
      <div
        className="GenericModal--overlay"
        onClick={() => onClose(false)}
      ></div>

      <div className="GenericModal__content">
        <header>
          <p>{title}</p>
          <button type="button" onClick={() => onClose(false)}>
            X
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}
