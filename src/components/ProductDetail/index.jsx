import './index.sass';

export default function ProductDetail({
  productDetail,
  shopCartProducts,
  setShopCartProducts,
  onClose
}) {
  const shopCartProductsIncludes = (value) =>
    shopCartProducts.find((pro) => pro.title.includes(value));

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
  );
}
