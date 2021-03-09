import './Card.sass';

const setMaxRangeTitle = (title) =>
  title.length >= 16 ? title.substring(0, 16) + '...' : title;

function Card({ product, setModalOpen, setModalProduct }) {
  const { image, category, title, price } = product;

  return (
    <div
      className="Card"
      onClick={() => {
        setModalOpen(true);
        setModalProduct(product);
      }}
    >
      <div className="Card__img">
        <img src={image} alt={category} />
      </div>
      <div className="Card__info">
        <h4>{category}</h4>
        <h3>{setMaxRangeTitle(title)}</h3>
        <div className="Card__info--price">{price}</div>
      </div>
    </div>
  );
}

export default Card;
