import Card from './Card';
import './CardList.sass';

const fakeProducts = require("../mocks/data/products.json");

function CardList() {
  return (
    <section className="CardList">
      { 
        fakeProducts.map((product) => <Card
                                        image={ product.image }
                                        category={ product.category }
                                        title={ product.title }
                                        price={ product.price }
                                        key={ product.id }
                                      /> )
      }
    </section>
  )
}

export default CardList;