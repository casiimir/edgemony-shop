import './ShoppingCart.sass';
import shoppingCartIco from '../mocks/img/shopping-cart.png';

function ShoppingCart({ shopCartProducts }) {
  const sumCartTotal = () => {
    let tot = 0;

    shopCartProducts.map((product) => (tot += product.price));
    return tot >= 1 ? `${Math.round(tot * 100) / 100}€` : '';
  };

  return (
    <div className="chart">
      <p className="chart--total">{sumCartTotal()}</p>
      <img
        className="chart--shopping"
        src={shoppingCartIco}
        alt="shopping-cart"
      />
      <div className="chart--elsInChart">
        {shopCartProducts.length > 0 ? shopCartProducts.length : ''}
      </div>
    </div>
  );
}

export default ShoppingCart;
