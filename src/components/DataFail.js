import './DataFail.sass';

function DataFail({ setReloadAPICall, isErrorBanner, setErrorBanner }) {
  return(
    <div className={ !isErrorBanner ? 'DataFail' : 'DataFailHidden' }>
      <h2>Data not found</h2>
      <button onClick={ () => setReloadAPICall() }>reload data</button>
      <button onClick={ () => setErrorBanner() }>X</button>
    </div>
  )
}

export default DataFail;