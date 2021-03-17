import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Product from './pages/Product';
import Page404 from './pages/Page404';

import Header from './components/Header/index';

import './App.sass';

const data = {
  title: 'Edgemony Shop',
  description: 'A fake e-commerce with a lot of potential',
  logo:
    'https://edgemony.com/wp-content/uploads/2020/03/cropped-Logo-edgemony_TeBIANCO-04.png',
  cover:
    'https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
};

function App() {
  // Modal state management
  const [isCartOpen, setCartOpen] = useState(false);

  // Cart state management and functions
  const [cartProducts, setCartProducts] = useState([]);

  const calculateTotalPrice = () => {
    const value = cartProducts
      .reduce((cont, product) => cont + product.price * product.quantity, 0)
      .toFixed(2);
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <Router>
      <div className="App">
        <Header
          logo={data.logo}
          cartProducts={cartProducts}
          calculateTotalPrice={calculateTotalPrice}
          isCartOpen={isCartOpen}
          setCartOpen={setCartOpen}
        />

        <Switch>
          <Route exact path="/">
            <Home
              data={data}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              isCartOpen={isCartOpen}
              setCartOpen={setCartOpen}
            />
          </Route>
          <Route path="/product/:productID">
            <Product />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
