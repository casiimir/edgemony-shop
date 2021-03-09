import './Header.sass';
import ShoppingCartHeader from './ShoppingCartHeader';

function Header({ logo, shopCartProducts, setOpenChart }) {
  return (
    <header className="Header">
      <img className="Header__logo" src={logo} alt="logo" />
      <ShoppingCartHeader
        shopCartProducts={shopCartProducts}
        setOpenChart={setOpenChart}
      />
    </header>
  );
}

export default Header;
