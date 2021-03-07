import { useState, useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';
import Categories from './components/Categories';
import CardList from './components/CardList';
import Loader from './components/Loader';
import DataFail from './components/DataFail';
import Footer from './components/Footer';
import './App.sass';

const searchFilterProducts = (list, key) => {
  return list.filter((products) => products.title.toLowerCase().includes(key));
};

const filterListByCategory = (list, category) => {
  return list.filter((products) => products.category.includes(category));
};

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
      fetch('https://fakestoreapi.com/products')
        .then((result) => result.json())
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

  // Search state management
  const [searchProducts, setSearchProducts] = useState('');
  // Get the input from SearchField <input> onInput
  const getValueFromInput = (evt) => setSearchProducts(evt.target.value);

  // Tag state management
  const [tagSelected, setTagSelected] = useState([]);

  const getCategoriesFromTag = (evt) => {
    setTagSelected(evt);
  };

  return (
    <div className="App">
      <Header logo={data.logo} />

      <Hero
        title={data.title}
        cover={data.cover}
        description={data.description}
      />

      <SearchField setSearchProducts={getValueFromInput} />

      <Categories
        tagSelected={(key) => {
          getCategoriesFromTag(key);
        }}
      />

      {/* If fetch gets data from fakestoreapi.com then it'll render a loder
          while downloaded. If not it'll render the DataFail component
      */}

      {isProductsLoad ? (
        products ? (
          <CardList
            products={products
              .filter((product) => product.category.includes(tagSelected))
              .filter((el) => el.title.includes(searchProducts))}
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

      <Footer />
    </div>
  );
}

export default App;
