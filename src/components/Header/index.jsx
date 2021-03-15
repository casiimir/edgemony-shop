import './index.sass';
import ShoppingCartIcon from '../ShoppingCartIcon';

function Header({
  logo,
  shopCartProducts,
  calculateTotalPrice,
  isCartOpen,
  setCartOpen
}) {
  return (
    <header className="Header">
      <img className="Header__logo" src={logo} alt="logo" />
      <ShoppingCartIcon
        shopCartProducts={shopCartProducts}
        calculateTotalPrice={calculateTotalPrice}
        isCartOpen={isCartOpen}
        setCartOpen={setCartOpen}
      />
    </header>
  );
}

export default Header;
