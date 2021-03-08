import './Modal.sass';

function Modal({ image, title, description, price, closeModal }) {
  return (
    <div className="Modal">
      <div className="Modal--overlay" onClick={() => closeModal()}></div>
      <div className="Modal__content">
        <div className="closeButton" onClick={() => closeModal()}>
          X
        </div>
        <img src={image} alt={title} />
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="Modal__content--price">{price}</p>
      </div>
    </div>
  );
}

export default Modal;
