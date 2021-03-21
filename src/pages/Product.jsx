import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { getProductAPI } from '../services/api';
import './Product.sass';

export default function Product({ isInCart, addToCart, removeItemFromChart }) {
  let { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductAPI(productID).then((product) => {
      setProduct(product);
    });
  }, [productID]);

  const toggleCart = () => {
    if (isInCart(product)) {
      removeItemFromChart(product.id);
    } else {
      addToCart(product);
    }
  };

  function carouselBtn(direction) {
    const path = `${window.location.origin}/product/`;
    const currentID = parseInt(window.location.pathname.substr(9));
    direction === 'right'
      ? window.location.assign(path + Number(currentID + 1))
      : window.location.assign(path + Number(currentID - 1));
  }

  return (
    <div className="Product">
      {product ? (
        <div className="content">
          <button
            className="btn--left"
            type="button"
            onClick={() => carouselBtn('left')}
          >{`<`}</button>

          <div className="text">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button type="button" className="addToCart" onClick={toggleCart}>
              {isInCart(product) ? 'Remove to Cart -' : 'Add to Cart +'}
            </button>
          </div>
          <div className="image">
            <img src={product.image} alt={product.title} />
          </div>
          <button
            className="btn--right"
            type="button"
            onClick={() => carouselBtn('right')}
          >{`>`}</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
