import Card from '../Card';
import './index.sass';

function CardList({ products, setProductDetail, setModalOpen }) {
  return (
    <section className="CardList">
      {products.map((product) => (
        <Card
          product={product}
          setProductDetail={setProductDetail}
          setModalOpen={setModalOpen}
          key={product.id}
        />
      ))}
    </section>
  );
}

export default CardList;
