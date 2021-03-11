import './ShoppingCart.sass';

export default function ShoppingCart({
  shopCartProducts,
  setOpenChart,
  editQuantity,
  removeItemFromChart,
  calculateTotalPrice
}) {
  return (
    <div className="ShoppingCart">
      {shopCartProducts.map((product) => (
        <article key={product.id}>
          <div className="image">
            <img src={product.image} alt={product.title} />
          </div>
          <h3>{product.title}</h3>
          <div className="content">
            <p>{product.price}€</p>
            <button
              type="button"
              onClick={() => {
                //quantity --
                product.quantity > 1 &&
                  editQuantity(product.id, product.quantity - 1);
              }}
            >
              -
            </button>
            <p>{product.quantity}</p>
            <button
              type="button"
              onClick={() => {
                //quantity ++
                editQuantity(product.id, product.quantity + 1);
              }}
            >
              +
            </button>
          </div>
          <button type="button" onClick={() => removeItemFromChart(product.id)}>
            remove
          </button>
        </article>
      ))}
      <footer>
        <p>
          {shopCartProducts.length >= 1
            ? `Total: ${calculateTotalPrice()}`
            : 'No product available in this cart.'}
        </p>
      </footer>
    </div>
  );
}
