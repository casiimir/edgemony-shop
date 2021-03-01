import './Card.sass';

function Card({ image, category, title, price }) {
  return (
    <article className="Card">
      <div className="Card__img">
        <img src={ image } alt={ category }/>
      </div>
      <div className="Card__info">
        <h3>{ title }</h3>
        <div className="Card__info--price">{ price }</div>
        <button>View Details</button>
      </div>
    </article>
  )
}

export default Card;