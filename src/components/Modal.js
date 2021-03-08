import { useState } from 'react';
import './Modal.sass';

function Modal({
  image,
  title,
  description,
  price,
  shopCart,
  setShopCart,
  closeModal
}) {
  const [disableButton, setDisableButton] = useState(false);

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
        <button
          onClick={() => {
            setShopCart([...shopCart, { title: title, price: price }]);
            setDisableButton(true);
          }}
          disabled={disableButton && true}
        >
          {!disableButton ? 'Add to cart' : 'In cart'}
        </button>
      </div>
    </div>
  );
}

export default Modal;
