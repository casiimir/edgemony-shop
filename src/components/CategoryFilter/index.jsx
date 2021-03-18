import './index.sass';

export default function CategoryFilter({
  name,
  selectedCategories,
  onSelectCategory
}) {
  const isSelected = selectedCategories.includes(name);
  const className = 'CategoryFilter btn--cat' + (isSelected ? ' selected' : '');

  const toggleCategory = () => {
    const newSelected = isSelected
      ? selectedCategories.filter((category) => category !== name)
      : [...selectedCategories, name];
    onSelectCategory(newSelected);
  };

  return (
    <button key={name} className={className} onClick={toggleCategory}>
      {name}
    </button>
  );
}
