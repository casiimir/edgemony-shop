import './index.sass';

export default function ProductDetail({
  cartProducts,
  productDetail,
  setCartProducts,
  onClose,
  addToCart
}) {
  const shopCartProductsIncludes = (value) =>
    cartProducts.find((pro) => pro.title.includes(value));

  const { image, title, description, price, id } = productDetail;

  return (
    <div className="ProductDetail__content">
      <div className="data">
        <div className="closeButton" onClick={() => onClose(false)}>
          X
        </div>

        <h1>{title}</h1>

        <p>{description}</p>

        <div className="price">
          <p className="ProductDetail__content--price">{price}</p>
          <button
            onClick={() =>
              !shopCartProductsIncludes(title)
                ? addToCart(productDetail)
                : setCartProducts(
                    cartProducts.filter((product) => product.id !== id)
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
  );
}
