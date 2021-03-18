import './index.sass';

function SearchField({ onSearch, term }) {
  return (
    <div className="Search">
      <input
        type="search"
        placeholder="Search here..."
        value={term}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchField;
