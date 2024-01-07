import { useContext, useEffect } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import Loading from "../Loading/Loading";
import './categories.css';

export default function Categories({ pullCategory }: { pullCategory: (props: string) => void }) {
  const { allCategories, fetchAllCategories, error } = useContext(CategoriesContext);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      {error && <div className="error">{error}</div>}
      {(!allCategories && !error) &&
        <Loading />
      }
      <div className="container">
        {allCategories &&
          <div className="categories">
            <h2>Search Board Games by Category</h2>
            <select name="categories" defaultValue={"none"}>
              <option value="none" disabled>Select a category:</option>
              <option value="all" onClick={() => pullCategory('all')}>All</option>
              {allCategories.map((category: string) => (
                <option key={category} value={category} onClick={() => pullCategory(category)}>{category}</option>
              ))
              }
            </select>
          </div>
        }
      </div>
    </>
  );
};
