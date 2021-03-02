import './Modal.sass';

function Modal({ image, title, description, price, closeModal }) {
  return (
    <div className="Modal">
      <div className="Modal__content" onClick={ () => closeModal() }>
        <img src={ image } alt={ title }/>
        <h1>{ title }</h1>
        <p>{ description }</p>
        <p>{ price }</p>
        <div className="closeButton">X</div>
      </div>
    </div>
  )
}

export default Modal;