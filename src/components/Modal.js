import './Modal.sass';

function Modal({
  product,
  shopCartProducts,
  setShopCartProducts,
  setModalOpen
}) {
  const shopCartProductsIncludes = (value) =>
    shopCartProducts.find((pro) => pro.title.includes(value));

  const { image, title, description, price, id } = product;
  return (
    <div className="Modal">
      <div className="Modal--overlay" onClick={() => setModalOpen(false)}></div>
      <div className="Modal__content">
        <div className="closeButton" onClick={() => setModalOpen(false)}>
          X
        </div>
        <img src={image} alt={title} />
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="Modal__content--price">{price}</p>
        <button
          onClick={() =>
            setShopCartProducts([
              ...shopCartProducts,
              {
                title: title,
                price: price,
                image: image,
                description: description,
                id: id
              }
            ])
          }
          disabled={shopCartProductsIncludes(title) && true}
        >
          {shopCartProductsIncludes(title) ? 'Add to cart' : 'In cart'}
        </button>
      </div>
    </div>
  );
}

export default Modal;
