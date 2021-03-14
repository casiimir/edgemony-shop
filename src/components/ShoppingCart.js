import { setMaxRangeTitle } from '../services/utils.js';
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
          <div className="content">
            <h3>
              {window.innerWidth <= 500
                ? setMaxRangeTitle(product.title, 20)
                : product.title}
            </h3>
            <p>{product.price}€</p>
          </div>
          <div className="buttons">
            <div className="buttons__quantity">
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
            <button
              className="removeBtn"
              type="button"
              onClick={() => removeItemFromChart(product.id)}
            >
              remove
            </button>
          </div>
        </article>
      ))}
      <footer>
        <p>
          {shopCartProducts.length >= 1
            ? calculateTotalPrice()
            : 'No product available in this cart.'}
        </p>
      </footer>
    </div>
  );
}
