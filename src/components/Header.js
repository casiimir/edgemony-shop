import './Header.sass';
import shoppingCart from '../mocks/img/shopping-cart.png';

function Header({ logo, shopCart }) {
  const sumCartTotal = () => {
    let tot = 0;

    shopCart.map((product) => (tot += product.price));
    return tot >= 1 ? `${Math.round(tot * 100) / 100}€` : '';
  };

  return (
    <header className="Header">
      <img className="Header__logo" src={logo} alt="logo" />
      <div className="chart">
        <p className="chart--total">{sumCartTotal()}</p>
        <img
          className="chart--shopping"
          src={shoppingCart}
          alt="shopping-cart"
        />
        <div className="chart--elsInChart">
          {shopCart.length > 0 ? shopCart.length : ''}
        </div>
      </div>
    </header>
  );
}

export default Header;
