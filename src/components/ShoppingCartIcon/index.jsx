import { Link } from 'react-router-dom';

import './index.sass';
import shoppingCartIco from '../../mocks/img/shopping-cart.png';

function ShoppingCartHeader({
  cartProducts,
  calculateTotalPrice,
  isOpen,
  toggleOpen
}) {
  return (
    <div className="chart">
      <p className="chart--total">
        {!!cartProducts.length && calculateTotalPrice()}
      </p>
      <Link to="/cart">
        <img
          className="chart--shopping"
          src={shoppingCartIco}
          alt="shopping-cart"
        />
      </Link>
      <div className="chart--elsInChart">
        {cartProducts.length > 0 ? cartProducts.length : ''}
      </div>
    </div>
  );
}

export default ShoppingCartHeader;
