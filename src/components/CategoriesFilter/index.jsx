import CategoryFilter from '../CategoryFilter';

import './index.sass';

export default function CategoriesFilter({
  categories,
  selectedCategories,
  onSelectCategory
}) {
  return (
    <div className="CategoriesFilter">
      {categories.map((category) => (
        <CategoryFilter
          key={category}
          name={category}
          selectedCategories={selectedCategories}
          onSelectCategory={onSelectCategory}
        />
      ))}
    </div>
  );
}
