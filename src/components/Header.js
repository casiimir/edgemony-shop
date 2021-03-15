import './Header.sass';
import ShoppingCartHeader from './ShoppingCartHeader';

function Header({
  logo,
  shopCartProducts,
  calculateTotalPrice,
  setGenericModalOpen,
  isCartOpen,
  setCartOpen
}) {
  return (
    <header className="Header">
      <img className="Header__logo" src={logo} alt="logo" />
      <ShoppingCartHeader
        shopCartProducts={shopCartProducts}
        calculateTotalPrice={calculateTotalPrice}
        setGenericModalOpen={setGenericModalOpen}
        isCartOpen={isCartOpen}
        setCartOpen={setCartOpen}
      />
    </header>
  );
}

export default Header;
