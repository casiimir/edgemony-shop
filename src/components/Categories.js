import { useEffect, useState } from 'react';
import './Categories.sass';

export default function Categories({ tagSelected }) {
  const [categories, setCategories] = useState([]);
  const [activeTag, setActiveTag] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((result) => result.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="Categories">
      {categories.map((cat, i) => {
        return (
          <div
            className={activeTag === cat ? 'tag selectedTag' : 'tag'}
            key={i}
            onClick={(e) => {
              if (e.target.textContent === activeTag) {
                e.target.className = 'tag';
                setActiveTag(cat);
                tagSelected('');
              } else {
                setActiveTag(cat);
                tagSelected(cat);
              }
            }}
          >
            {cat}
          </div>
        );
      })}
    </div>
  );
}
