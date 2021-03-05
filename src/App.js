import { useState, useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';
import CardList from './components/CardList';
import Loader from './components/Loader';
import DataFail from './components/DataFail';
import Footer from './components/Footer';
import "./App.sass";

const searchFilterProducts = (list, key) => {
  return list.filter((products) => products.title.toLowerCase().includes(key));
}

const data = {
  title: "Edgemony Shop",
  description: "A fake e-commerce with a lot of potential",
  logo:
    "https://edgemony.com/wp-content/uploads/2020/03/cropped-Logo-edgemony_TeBIANCO-04.png",
  cover:
    "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
};

function App() {

  const [ products, setProduct ] = useState();
  const [ isProductsLoad, setProductsLoad ] = useState(true);
  const [ reloadAPICall, setReloadAPICall ] = useState(true);
  const [ isErrorBanner, setErrorBanner ] = useState(false);
  const [ searchProducts, setSearchProducts ] = useState('');

  useEffect(() => {
    if (reloadAPICall) {
      fetch('https://fakestoreapi.com/products')
        .then(result => result.json())
        .then(data => {          
          setProduct(data);  
          setProductsLoad(true);
        })

        .catch((error) => {
          console.log(error.message);
          setProductsLoad(false);
          setReloadAPICall(false);
        })
    }
  }, [reloadAPICall]);


  const getValueFromInput = (evt) => {
    setSearchProducts(evt.target.value)
  }

  return (
    <div className="App">
      <Header logo={ data.logo }/>

      <Hero
        title={ data.title }
        cover={ data.cover}
        description={ data.description }
      />

      <SearchField setSearchProducts={ getValueFromInput }/>

      {/* If fetch gets data from fakestoreapi.com then it'll render a loder
          while downloaded. If not it'll render the DataFail component
      */}

      {
        (isProductsLoad)
          ? (products)
            ? <CardList products={ searchFilterProducts(products, searchProducts) }/>
            : <Loader />
          : <DataFail
            setReloadAPICall={ () => setReloadAPICall(true) }
            isErrorBanner={ isErrorBanner }
            setErrorBanner={ () => setErrorBanner(true) }
            />
      }
      
      <Footer />
    </div>
  )
}

export default App;