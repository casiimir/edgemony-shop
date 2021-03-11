import './Header.sass';
import ShoppingCartHeader from './ShoppingCartHeader';

function Header({
  logo,
  shopCartProducts,
  setOpenChart,
  calculateTotalPrice,
  isGenericModalOpen,
  setGenericModalOpen
}) {
  return (
    <header className="Header">
      <img className="Header__logo" src={logo} alt="logo" />
      <ShoppingCartHeader
        shopCartProducts={shopCartProducts}
        setOpenChart={setOpenChart}
        calculateTotalPrice={calculateTotalPrice}
        isGenericModalOpen={isGenericModalOpen}
        setGenericModalOpen={setGenericModalOpen}
      />
    </header>
  );
}

export default Header;
