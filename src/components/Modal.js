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
        <div className="data">
          <div className="closeButton" onClick={() => setModalOpen(false)}>
            X
          </div>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="price">
            <p className="Modal__content--price">{price}</p>
            <button
              onClick={() =>
                !shopCartProductsIncludes(title)
                  ? setShopCartProducts([
                      ...shopCartProducts,
                      {
                        title: title,
                        price: price,
                        image: image,
                        description: description,
                        id: id,
                        quantity: 1
                      }
                    ])
                  : setShopCartProducts(
                      shopCartProducts.filter((product) => product.id !== id)
                    )
              }
            >
              {!shopCartProductsIncludes(title)
                ? 'Add to cart'
                : 'Remove from cart'}
            </button>
          </div>
        </div>
        <div className="image">
          <img src={image} alt={title} />
        </div>
      </div>
    </div>
  );
}

export default Modal;
