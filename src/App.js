import { useState, useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import CardList from './components/CardList';
import Loader from './components/Loader';
import DataFailure from './components/DataFailure';
import Footer from './components/Footer';
import "./App.sass";

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

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(result => result.json())
      .then(data => {
        setProduct(data);

        setProductsLoad(true);
      })
      .catch((error) => {
        console.log(error.message);
        setProductsLoad(false);
      })
  }, []);

  return (
    <div className="App">
      <Header logo={ data.logo }/>

      <Hero
        title={ data.title }
        cover={ data.cover}
        description={ data.description }
      />

      {
        (isProductsLoad) ?
          (products) ?
            <CardList products={ products }/> :
            <Loader />
          : <DataFailure />
      }
      
      <Footer />
    </div>
  )
}

export default App;
