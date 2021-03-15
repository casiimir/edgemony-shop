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
import './App.sass';

// TEST
import Modal from './components/Modal';
import ProductDetail from './components/ProductDetail';
import ModalBodyCenter from './components/ModalBodyCenter.js';
import ModalBodySidebar from './components/ModalBodySidebar.js';

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

  // Search & Tag (categories) state management
  const [searchProducts, setSearchProducts] = useState('');
  const [tagSelected, setTagSelected] = useState([]);
  // Get the input from SearchField <input> onInput
  const getValueFromInput = (evt) =>
    setSearchProducts(evt.target.value.toLowerCase());

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

  // TEst
  // Modal
  const [isUniqueModalOpen, setUniqueModalOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <div className={isGenericModalOpen ? 'App blockScroll' : 'App'}>
      <Header
        logo={data.logo}
        shopCartProducts={shopCartProducts}
        setOpenChart={setOpenChart}
        calculateTotalPrice={calculateTotalPrice}
        isGenericModalOpen={isGenericModalOpen}
        setGenericModalOpen={setGenericModalOpen}
        isCartOpen={isCartOpen}
        setCartOpen={setCartOpen}
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
            setUniqueModalOpen={setUniqueModalOpen}
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
      {/* {isGenericModalOpen && (
        <GenericModal
          isOpen={isGenericModalOpen}
          onClose={() => setGenericModalOpen(false)}
          title="Cart"
        >
          <ShoppingCart
            shopCartProducts={shopCartProducts}
            editQuantity={editQuantity}
            removeItemFromChart={removeItemFromChart}
            calculateTotalPrice={calculateTotalPrice}
          />
        </GenericModal>
      )} */}

      {isCartOpen && (
        <Modal blockScroll={() => setGenericModalOpen(false)}>
          <ModalBodySidebar onClose={() => setCartOpen(false)}>
            <ShoppingCart
              shopCartProducts={shopCartProducts}
              editQuantity={editQuantity}
              removeItemFromChart={removeItemFromChart}
              calculateTotalPrice={calculateTotalPrice}
            />
          </ModalBodySidebar>
        </Modal>
      )}

      <Footer />
      {/* TEST */}
      {/* {isUniqueModalOpen && (
        <Modal
          onClose={() => setUniqueModalOpen(false)}
          product={modalProduct}
          shopCartProducts={shopCartProducts}
          setShopCartProducts={setShopCartProducts}
        >
          <ProductDetail
            product={modalProduct}
            setShopCartProducts={setShopCartProducts}
            shopCartProducts={shopCartProducts}
            onClose={() => setUniqueModalOpen(false)}
          />
        </Modal>
      )} */}

      {isUniqueModalOpen && (
        <Modal
          onClose={() => setUniqueModalOpen(false)}
          blockScroll={() => setGenericModalOpen(false)}
        >
          <ModalBodyCenter>
            <ProductDetail
              product={modalProduct}
              setShopCartProducts={setShopCartProducts}
              shopCartProducts={shopCartProducts}
              onClose={() => setUniqueModalOpen(false)}
            />
          </ModalBodyCenter>
        </Modal>
      )}
    </div>
  );
}

export default App;
