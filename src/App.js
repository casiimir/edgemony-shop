import { useState, useEffect } from 'react';
import { getProductsAPI } from './services/api.js';

import Header from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';
import Categories from './components/Categories';
import CardList from './components/CardList';
import Loader from './components/Loader';
import Modal from './components/Modal';
import DataFail from './components/DataFail';
import Footer from './components/Footer';
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

  // Tag state management
  const [tagSelected, setTagSelected] = useState([]);

  const getCategoriesFromTag = (evt) => {
    setTagSelected(evt);
  };

  // Shop cart state management
  const [shopCart, setShopCart] = useState([]);

  return (
    <div className="App">
      <Header logo={data.logo} shopCart={shopCart} />

      <Hero
        title={data.title}
        cover={data.cover}
        description={data.description}
      />

      <div className="Search">
        <SearchField setSearchProducts={getValueFromInput} />

        <Categories
          tagSelected={(key) => {
            getCategoriesFromTag(key);
          }}
        />
      </div>

      {/* If fetch gets data from fakestoreapi.com then it'll render a loader
            while downloaded. If not it'll render the DataFail component
        */}
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
            shopCart={shopCart}
            setShopCart={(articles) => setShopCart(articles)}
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
        /* Set Modal if click in one of the products' card */
        isModalOpen && (
          <Modal
            product={modalProduct}
            setModalOpen={setModalOpen}
            shopCart={shopCart}
            setShopCart={setShopCart}
          />
        )
      }
      <Footer />
    </div>
  );
}

export default App;
