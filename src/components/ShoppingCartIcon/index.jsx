import './index.sass';
import shoppingCartIco from '../../mocks/img/shopping-cart.png';

function ShoppingCartHeader({
  shopCartProducts,
  calculateTotalPrice,
  isCartOpen,
  setCartOpen
}) {
  return (
    <div className="chart">
      <p className="chart--total">
        {!!shopCartProducts.length && calculateTotalPrice()}
      </p>
      <img
        className="chart--shopping"
        src={shoppingCartIco}
        alt="shopping-cart"
        onClick={() => {
          setCartOpen(!isCartOpen);
        }}
      />
      <div className="chart--elsInChart">
        {shopCartProducts.length > 0 ? shopCartProducts.length : ''}
      </div>
    </div>
  );
}

export default ShoppingCartHeader;
