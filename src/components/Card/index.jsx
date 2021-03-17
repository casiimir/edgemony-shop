import { Link } from 'react-router-dom';
import { setMaxRangeTitle } from '../../services/utils.js';
import './index.sass';

function Card({ product }) {
  const { id, image, category, title, price } = product;

  return (
    <Link to={`/product/${id}`}>
      <div className="Card">
        <div className="Card__img">
          <img src={image} alt={category} />
        </div>
        <div className="Card__info">
          <h3>{setMaxRangeTitle(title, 16)}</h3>
          <div className="Card__info--price">{price}</div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
