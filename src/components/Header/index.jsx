import './index.sass';
import ShoppingCartIcon from '../ShoppingCartIcon';
import { Link } from 'react-router-dom';

function Header({
  logo,
  cartProducts,
  calculateTotalPrice,
  isCartOpen,
  setCartOpen
}) {
  return (
    <header className="Header">
      <Link to="/">
        <img className="Header__logo" src={logo} alt="logo" />
      </Link>
      <ShoppingCartIcon
        cartProducts={cartProducts}
        calculateTotalPrice={calculateTotalPrice}
        isOpen={isCartOpen}
        toggleOpen={setCartOpen}
      />
    </header>
  );
}

export default Header;
