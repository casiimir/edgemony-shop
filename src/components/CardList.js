import Card from './Card';
import './CardList.sass';

function CardList({
  products,
  setModalOpen,
  setModalProduct,
  setUniqueModalOpen
}) {
  return (
    <section className="CardList">
      {products.map((product) => (
        <Card
          product={product}
          setModalOpen={setModalOpen}
          setModalProduct={setModalProduct}
          setUniqueModalOpen={setUniqueModalOpen}
          key={product.id}
        />
      ))}
    </section>
  );
}

export default CardList;
