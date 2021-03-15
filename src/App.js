import { useState, useEffect } from 'react';
import { getProductsAPI } from './services/api.js';

import Header from './components/Header/index';
import HeroSection from './components/HeroSection/index';

import CardList from './components/CardList/index';
import SearchSection from './components/SearchSection/index';
import ApiLoader from './components/ApiLoader/index';
import ApiDataFail from './components/ApiDataFail/index';

import Modal from './components/Modal/index';
import ModalBodyCenter from './components/ModalBodyCenter/index';
import ModalBodySidebar from './components/ModalBodySidebar/index';

import Cart from './components/Cart/index';
import ProductDetail from './components/ProductDetail/index';

import Footer from './components/Footer/index';

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
  // API state management
  const [products, setProduct] = useState();
  const [isProductsLoad, setProductsLoad] = useState(true);
  const [reloadAPICall, setReloadAPICall] = useState(true);

  useEffect(() => {
    if (reloadAPICall) {
      getProductsAPI()
        .then((data) => {
          setProduct(data);
          setProductsLoad(true);
        })
        .catch((error) => {
          console.log(error.message);
          setProductsLoad(false);
          setReloadAPICall(false);
        });
    }
  }, [reloadAPICall]);

  // Error API state management
  const [isErrorBanner, setErrorBanner] = useState(false);

  // Modal state management
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  // Search & Tag (categories) state management
  const [searchProducts, setSearchProducts] = useState('');
  const [tagSelected, setTagSelected] = useState([]);
  // Get the input from SearchField <input> onInput
  const getValueFromInput = (evt) =>
    setSearchProducts(evt.target.value.toLowerCase());

  // Cart state management and functions
  const [shopCartProducts, setShopCartProducts] = useState([]);

  const calculateTotalPrice = () => {
    const value = shopCartProducts
      .reduce((cont, product) => cont + product.price * product.quantity, 0)
      .toFixed(2);
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const editQuantity = (productID, quantity) => {
    setShopCartProducts(
      shopCartProducts.map((cartItem) =>
        productID === cartItem.id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeItemFromChart = (productID) => {
    setShopCartProducts(
      shopCartProducts.filter((cartItem) => cartItem.id !== productID)
    );
  };

  return (
    <div className="App">
      <Header
        logo={data.logo}
        shopCartProducts={shopCartProducts}
        calculateTotalPrice={calculateTotalPrice}
        isCartOpen={isCartOpen}
        setCartOpen={setCartOpen}
      />
      <HeroSection
        title={data.title}
        cover={data.cover}
        description={data.description}
      />

      <SearchSection
        setTagSelected={setTagSelected}
        setSearchProducts={getValueFromInput}
      />

      {isProductsLoad ? (
        products ? (
          <CardList
            products={products
              .filter((product) => product.category.includes(tagSelected))
              .filter(
                (el) =>
                  el.title.toLowerCase().includes(searchProducts) ||
                  el.description.toLowerCase().includes(searchProducts)
              )}
            setProductDetail={setProductDetail}
            setModalOpen={setModalOpen}
          />
        ) : (
          <ApiLoader />
        )
      ) : (
        <ApiDataFail
          setReloadAPICall={() => setReloadAPICall(true)}
          isErrorBanner={isErrorBanner}
          setErrorBanner={() => setErrorBanner(true)}
        />
      )}

      <Footer />

      {isCartOpen && (
        <Modal>
          <ModalBodySidebar onClose={() => setCartOpen(false)}>
            <Cart
              shopCartProducts={shopCartProducts}
              editQuantity={editQuantity}
              removeItemFromChart={removeItemFromChart}
              calculateTotalPrice={calculateTotalPrice}
            />
          </ModalBodySidebar>
        </Modal>
      )}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ModalBodyCenter>
            <ProductDetail
              productDetail={productDetail}
              setShopCartProducts={setShopCartProducts}
              shopCartProducts={shopCartProducts}
              onClose={() => setModalOpen(false)}
            />
          </ModalBodyCenter>
        </Modal>
      )}
    </div>
  );
}

export default App;
