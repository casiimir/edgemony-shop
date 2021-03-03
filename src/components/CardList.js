import Card from './Card';
import './CardList.sass';

function CardList({ products }) {
  return (
    <section className="CardList">
      { 
        products.map((product) =>
          <Card
            image={ product.image }
            category={ product.category }
            title={ product.title }
            price={ product.price }
            description={ product.description }
            key={ product.id }
          />
        )
      }
    </section>
  )
}

export default CardList;