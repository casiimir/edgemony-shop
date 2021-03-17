import { useState, useEffect } from 'react';

import HeroSection from '../components/HeroSection/index';

import CardList from '../components/CardList/index';
import SearchSection from '../components/SearchSection/index';
import ApiLoader from '../components/ApiLoader/index';
import ApiDataFail from '../components/ApiDataFail/index';

import Modal from '../components/Modal/index';
import ModalBodyCenter from '../components/ModalBodyCenter/index';
import ModalBodySidebar from '../components/ModalBodySidebar/index';

import ShoppingCart from '../components/ShoppingCart/index';
import ProductDetail from '../components/ProductDetail/index';

import Footer from '../components/Footer/index';

import { getProductsAPI } from '../services/api';
import './Home.sass';

function Home({
  data,
  cartProducts,
  setCartProducts,
  isCartOpen,
  setCartOpen,
  editQuantity,
  removeItemFromChart
}) {
  // API state management
  const [products, setProduct] = useState();
  const [isProductsLoad, setProductsLoad] = useState(true);
  const [reloadAPICall, setReloadAPICall] = useState(true);
  // Error API state management
  const [isErrorBanner, setErrorBanner] = useState(false);

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

  const filteredProducts = () =>
    products
      .filter((product) => product.category.includes(tagSelected))
      .filter(
        (el) =>
          el.title.toLowerCase().includes(searchProducts) ||
          el.description.toLowerCase().includes(searchProducts)
      );

  // Search & Tag (categories) state management
  const [searchProducts, setSearchProducts] = useState('');
  const [tagSelected, setTagSelected] = useState([]);
  // Get the input from SearchField <input> onInput
  const getValueFromInput = (evt) =>
    setSearchProducts(evt.target.value.toLowerCase());

  // Modal state management
  const [isModalOpen, setModalOpen] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  // Cart state management and functions
  // const [cartProducts, setCartProducts] = useState([]);

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
    <div className="Home">
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
            products={filteredProducts()}
            setProductDetail={setProductDetail}
            setModalOpen={() => setModalOpen(true)}
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
        <Modal onClose={() => setModalOpen(false)}>
          <ModalBodySidebar onClose={() => setCartOpen(false)}>
            <ShoppingCart
              cartProducts={cartProducts}
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
              setCartProducts={setCartProducts}
              cartProducts={cartProducts}
              onClose={() => setModalOpen(false)}
            />
          </ModalBodyCenter>
        </Modal>
      )}
    </div>
  );
}

export default Home;
