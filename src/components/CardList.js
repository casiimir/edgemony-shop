import Card from './Card';
import './CardList.sass';

function CardList({ products, shopCart, setShopCart }) {
  return (
    <section className="CardList">
      {products.map((product) => (
        <Card
          image={product.image}
          category={product.category}
          title={product.title}
          price={product.price}
          description={product.description}
          shopCart={shopCart}
          setShopCart={setShopCart}
          key={product.id}
        />
      ))}
    </section>
  );
}

export default CardList;
