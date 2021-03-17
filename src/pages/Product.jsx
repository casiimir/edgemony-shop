import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getProductAPI } from '../services/api';
import './Product.sass';

export default function Product() {
  let { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductAPI(productID).then((product) => {
      setProduct(product);
    });
  }, [productID]);

  return (
    <div className="Product">
      {product ? (
        <div className="content">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <img src={product.image} alt={product.title} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
