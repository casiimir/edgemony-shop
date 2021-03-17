import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div className="Product">
      {product ? (
        <div className="content">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <img src={product.image} alt={product.title} />
          <button type="button" className="addToCart" onClick={toggleCart}>
            {isInCart(product) ? 'Remove to Cart -' : 'Add to Cart +'}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
