import { useEffect, useState } from 'react';
import { getCategoriesAPI } from '../services/api.js';
import './Categories.sass';

export default function Categories({ setTagSelected }) {
  const [categories, setCategories] = useState([]);
  const [activeTag, setActiveTag] = useState('');
  const [reloadCat, setReloadCat] = useState(false);

  useEffect(() => {
    getCategoriesAPI()
      .then((data) => setCategories(data))
      .catch((error) => {
        setReloadCat(true);
      });
  }, [reloadCat]);

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
                setActiveTag([...activeTag, cat]);
                setTagSelected('');
              } else {
                setActiveTag(cat);
                setTagSelected(cat);
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
