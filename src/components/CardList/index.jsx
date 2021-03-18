import { useLocation, useHistory } from 'react-router-dom';
import Card from '../Card';
import SearchField from '../SearchField/index';
import CategoriesFilter from '../CategoriesFilter/index';
import './index.sass';

function CardList({ products, categories }) {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const selectedCategories = query.get('categories')
    ? query.get('categories').split(',')
    : [];

  function setSelectedCategories(cat) {
    if (cat.length > 0) {
      query.set('categories', cat.join(','));
    } else {
      query.delete('categories');
    }
    history.push({ search: '?' + query.toString() });
  }

  const searchTerm = query.get('q') || '';

  function setSearchTerm(term) {
    if (term) {
      query.set('q', term);
    } else {
      query.delete('q');
    }
    history.push({ search: '?' + query.toString() });
  }

  const termRegexp = new RegExp(searchTerm, 'i');

  const filteredProducts = products.filter(
    (product) =>
      product.title.search(termRegexp) !== -1 &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category))
  );

  return (
    <section className="CardList">
      <div className="ProductList__filters">
        <SearchField term={searchTerm} onSearch={setSearchTerm} />
        <CategoriesFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectCategory={setSelectedCategories}
        />
      </div>
      <div className="ProductList__items">
        {filteredProducts.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export default CardList;
