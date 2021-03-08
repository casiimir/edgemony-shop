import './SearchField.sass';

function SearchField({ setSearchProducts }) {
  return (
    <div className="SearchField">
      <label htmlFor="search">Search</label>
      <input type="search" id="search" onInput={(e) => setSearchProducts(e)} />
    </div>
  );
}

export default SearchField;
