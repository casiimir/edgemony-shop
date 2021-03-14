import { useState, useEffect } from 'react';
import { getProductsAPI } from './services/api.js';

import Header from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';
import Categories from './components/Categories';
import CardList from './components/CardList';
import Loader from './components/Loader';
import DataFail from './components/DataFail';
import Footer from './components/Footer';

import GenericModal from './components/GenericModal';
import ShoppingCart from './components/ShoppingCart';
import Modal from './components/Modal';
import ShoppingCartModal from './components/ShoppingCartModal';
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
  const [modalProduct, setModalProduct] = useState({});

  // Search state management
  const [searchProducts, setSearchProducts] = useState('');
  // Get the input from SearchField <input> onInput
  const getValueFromInput = (evt) =>
    setSearchProducts(evt.target.value.toLowerCase());

  // Tag (Categories) state management
  const [tagSelected, setTagSelected] = useState([]);

  // Shop cart state management
  const [shopCartProducts, setShopCartProducts] = useState([]);
  const [isOpenChart, setOpenChart] = useState(false);

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

  // Generic Modal state management
  const [isGenericModalOpen, setGenericModalOpen] = useState(false);

  return (
    <div className={isGenericModalOpen ? 'App blockScroll' : 'App'}>
      <Header
        logo={data.logo}
        shopCartProducts={shopCartProducts}
        setOpenChart={setOpenChart}
        calculateTotalPrice={calculateTotalPrice}
        isGenericModalOpen={isGenericModalOpen}
        setGenericModalOpen={setGenericModalOpen}
      />

      <Hero
        title={data.title}
        cover={data.cover}
        description={data.description}
      />

      <div className="Search">
        <SearchField setSearchProducts={getValueFromInput} />

        <Categories setTagSelected={setTagSelected} />
      </div>

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
            setModalOpen={setModalOpen}
            setModalProduct={(value) => setModalProduct(value)}
          />
        ) : (
          <Loader />
        )
      ) : (
        <DataFail
          setReloadAPICall={() => setReloadAPICall(true)}
          isErrorBanner={isErrorBanner}
          setErrorBanner={() => setErrorBanner(true)}
        />
      )}

      {
        // Show Product Modal if click in one of the products' card
        isModalOpen && (
          <Modal
            product={modalProduct}
            setModalOpen={setModalOpen}
            shopCartProducts={shopCartProducts}
            setShopCartProducts={setShopCartProducts}
          />
        )
      }

      {
        // Show Shop Cart Modal if click in header's icon
        isOpenChart && (
          <ShoppingCartModal
            shopCartProducts={shopCartProducts}
            setModalOpen={setModalOpen}
            setModalProduct={setModalProduct}
            setOpenChart={setOpenChart}
            editQuantity={editQuantity}
            removeItemFromChart={removeItemFromChart}
            calculateTotalPrice={calculateTotalPrice}
          />
        )
      }

      {isGenericModalOpen && (
        <GenericModal
          isOpen={isGenericModalOpen}
          onClose={setGenericModalOpen}
          title="Cart"
        >
          <ShoppingCart
            shopCartProducts={shopCartProducts}
            setModalOpen={setModalOpen}
            setModalProduct={setModalProduct}
            setOpenChart={setOpenChart}
            editQuantity={editQuantity}
            removeItemFromChart={removeItemFromChart}
            calculateTotalPrice={calculateTotalPrice}
          />
        </GenericModal>
      )}
      <Footer />
    </div>
  );
}

export default App;
