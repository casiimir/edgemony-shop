import './Modal.sass';

function Modal({ image, title, description, price, closeModal, randomColor }) {
  return (
    <div className="Modal">
      <div
        className="Modal__content"
        onClick={ () => closeModal() }
        style={{ border: `3px dotted ${randomColor}` }}
      >
        <div className="closeButton">X</div>
        <img src={ image } alt={ title }/>
        <h1>{ title }</h1>
        <p>{ description }</p>
        <p className="Modal__content--price">{ price }</p>
      </div>
    </div>
  )
}

export default Modal;