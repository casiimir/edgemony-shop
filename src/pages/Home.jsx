import { useState, useEffect } from 'react';

import HeroSection from '../components/HeroSection/index';

import CardList from '../components/CardList/index';
import ApiLoader from '../components/ApiLoader/index';
import ApiDataFail from '../components/ApiDataFail/index';

import Footer from '../components/Footer/index';

import { getProductsAPI, getCategoriesAPI } from '../services/api';
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
      Promise.all([getProductsAPI(), getCategoriesAPI()])
        .then(([productsData, categoriesData]) => {
          setProduct(productsData);
          setCategories(categoriesData);
          setProductsLoad(true);
          cache = { productsData, categoriesData };
        })
        .catch((error) => {
          console.log(error.message);
          setProductsLoad(false);
          setReloadAPICall(false);
        });
    }
  }, [reloadAPICall]);

  // Search & Tag (categories) state management
  const [categories, setCategories] = useState(
    cache ? cache.categoriesData : []
  );

  return (
    <div className="Home">
      <HeroSection
        title={data.title}
        cover={data.cover}
        description={data.description}
      />

      {isProductsLoad ? (
        products ? (
          <CardList products={products} categories={categories} />
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
