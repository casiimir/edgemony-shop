import { useState, useEffect } from 'react';

import HeroSection from '../components/HeroSection/index';

import CardList from '../components/CardList/index';
import SearchSection from '../components/SearchSection/index';
import ApiLoader from '../components/ApiLoader/index';
import ApiDataFail from '../components/ApiDataFail/index';

import Footer from '../components/Footer/index';

import { getProductsAPI } from '../services/api';
import './Home.sass';

let cache;

function Home({ data }) {
  // API state management
  const [products, setProduct] = useState(cache ? cache.productsData : []);
  const [isProductsLoad, setProductsLoad] = useState(true);
  const [reloadAPICall, setReloadAPICall] = useState(true);
  // Error API state management
  const [isErrorBanner, setErrorBanner] = useState(false);

  useEffect(() => {
    if (cache !== undefined) return;
    if (reloadAPICall) {
      getProductsAPI()
        .then((productsData) => {
          setProduct(productsData);
          setProductsLoad(true);
          cache = { productsData };
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
          <CardList products={filteredProducts()} />
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
    </div>
  );
}

export default Home;
