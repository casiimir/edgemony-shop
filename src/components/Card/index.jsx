import './index.sass';
import { setMaxRangeTitle } from '../../services/utils.js';

function Card({ product, setProductDetail, setModalOpen }) {
  const { image, category, title, price } = product;

  return (
    <div
      className="Card"
      onClick={() => {
        setProductDetail(product);
        setModalOpen();
      }}
    >
      <div className="Card__img">
        <img src={image} alt={category} />
      </div>
      <div className="Card__info">
        <h3>{setMaxRangeTitle(title, 16)}</h3>
        <div className="Card__info--price">{price}</div>
      </div>
    </div>
  );
}

export default Card;
