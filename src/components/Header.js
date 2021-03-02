import './Header.sass';
import shoppingCart from '../mocks/img/shopping-cart.png';

function Header({ logo }) {
  return (
    <header className="Header">
      <img className="Header__logo" src={ logo } alt="logo"/>
      <img className="Header__shopping" src={ shoppingCart } alt="shopping-cart"/>
    </header>
  )
}

export default Header;