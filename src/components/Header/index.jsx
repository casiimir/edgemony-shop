import './index.sass';
import ShoppingCartIcon from '../ShoppingCartIcon';

function Header({
  logo,
  cartProducts,
  calculateTotalPrice,
  isCartOpen,
  setCartOpen
}) {
  return (
    <header className="Header">
      <img className="Header__logo" src={logo} alt="logo" />
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
