import Card from '../Card';
import './index.sass';

function CardList({ products }) {
  return (
    <section className="CardList">
      {products.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </section>
  );
}

export default CardList;
