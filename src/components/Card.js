import './Card.sass';

const setMaxRangeTitle = (title) => (title.length >= 16) ?
  title.substring(0, 16) + '...' :
  title;

function Card({ image, category, title, price }) {
  return (
    <article className="Card">
      <div className="Card__img">
        <div className="Card__img--shape"></div>
        <img src={ image } alt={ category }/>
      </div>
      <div className="Card__info">
        <h3>{ setMaxRangeTitle(title) }</h3>
        <div className="Card__info--price">{ price }</div>
        {/* <button>View Details</button> */}
      </div>
    </article>
  )
}

export default Card;