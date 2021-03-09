import Card from './Card';
import './CardList.sass';

function CardList({
  products,
  setModalOpen,
  setModalProduct,
  shopCart,
  setShopCart
}) {
  return (
    <section className="CardList">
      {products.map((product) => (
        <Card
          product={product}
          setModalOpen={setModalOpen}
          setModalProduct={setModalProduct}
          shopCart={shopCart}
          setShopCart={setShopCart}
          key={product.id}
        />
      ))}
    </section>
  );
}

export default CardList;
