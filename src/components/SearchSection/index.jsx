import './index.sass';
import SearchField from './SearchField/index';
import Categories from './Categories/index';

export default function SearchSection({ setTagSelected, setSearchProducts }) {
  return (
    <div className="SearchSection">
      <SearchField setSearchProducts={setSearchProducts} />
      <Categories setTagSelected={setTagSelected} />
    </div>
  );
}
