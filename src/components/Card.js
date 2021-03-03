import { useState } from 'react';
import './Card.sass';
import Modal from './Modal';

const setMaxRangeTitle = (title) => (title.length >= 16) ?
  title.substring(0, 16) + '...' :
  title;

const setRandomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

function Card({ image, category, title, price, description }) {

  const [modalOn, setModalOn] = useState(false);

  return (
    <>
      <article className="Card" onClick={ () => setModalOn(!modalOn) }>
        <div className="Card__img">
          <div className="Card__img--shape" style={{ border: `2px dotted ${setRandomColor()}` }}></div>
          <img src={ image } alt={ category }/>
        </div>
        <div className="Card__info">
          <h3>{ setMaxRangeTitle(title) }</h3>
          <div className="Card__info--price">{ price }</div>
        </div>
      </article>
      {
        modalOn &&
          <Modal 
            image={ image }
            category={ category }
            title={ title }
            price={ price }
            description={ description }
            closeModal={ () => setModalOn(false) }
            randomColor={ setRandomColor() }
          />
      }
    </>
  )
}

export default Card;