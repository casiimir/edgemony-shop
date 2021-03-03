import './Loader.sass';

function Loader() {
  return(
    <div className="Loader">
      <h2>Loading...</h2>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader;