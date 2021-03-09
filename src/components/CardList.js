import Card from './Card';
import './CardList.sass';

function CardList({ products, setModalOpen, setModalProduct }) {
  return (
    <section className="CardList">
      {products.map((product) => (
        <Card
          product={product}
          setModalOpen={setModalOpen}
          setModalProduct={setModalProduct}
          key={product.id}
        />
      ))}
    </section>
  );
}

export default CardList;
