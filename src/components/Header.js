import './Header.sass';
import ShoppingCart from './ShoppingCart';

function Header({ logo, shopCartProducts }) {
  return (
    <header className="Header">
      <img className="Header__logo" src={logo} alt="logo" />
      <ShoppingCart shopCartProducts={shopCartProducts} />
    </header>
  );
}

export default Header;
