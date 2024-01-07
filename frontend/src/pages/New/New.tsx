import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext";
import Checkbox from "../../components/Checkbox/Checkbox";
import Loading from "../../components/Loading/Loading";
import './new.css';


const New = () => {
    const navigate = useNavigate();
    const { allCategories, fetchAllCategories } = useContext(CategoriesContext);
    const [error, setError] = useState<string | null>(null);

    // form elements passed to the DB
    const [title, setTitle] = useState<string>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [rating, setRating] = useState<number>();
    const [complexity, setComplexity] = useState<number>();
    const [category, setCategory] = useState<string[]>([]);

    useEffect(() => {
        fetchAllCategories();
    }, []);

    // checkbox function, removes or adds categories
    const handleChange = (checkedCategory: string, isChecked: boolean) => {
        isChecked ? setCategory([...category, checkedCategory]) : setCategory(category.filter((e: string) => e !== checkedCategory));
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!title || category.length === 0 || !price || !imageUrl || !complexity || !rating) {
            setError('Please fill out all fields');
            return;
        };

        const response = await fetch('/api/games', {
            method: 'POST',
            body: JSON.stringify({ title, imageUrl, price, rating, complexity, category }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 500) {
            setError('Can not connect to server');
            return;
        };

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        };

        if (response.ok) {
            setError(null);
            return navigate('/');
        };
    };

    return (
        <>
            {!allCategories &&
                <Loading />
            }
            <div className="container">
                {allCategories &&
                    <form onSubmit={handleSubmit}>
                        <h2>Add a New Game</h2>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} value={title} className={error ? 'input-error' : ''} />
                        <label htmlFor="url">Image URL:</label>
                        <input type="text" id="url" onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} className={error ? 'input-error' : ''} />
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" min={0} step={0.01} onChange={(e) => setPrice(parseFloat(e.target.value))} value={price} className={error ? 'input-error' : ''} />
                        <label htmlFor="rating">Rating: </label>
                        <input type="number" id="rating" min={1} max={10} step={0.1} onChange={(e) => setRating(parseFloat(e.target.value))} value={rating} className={error ? 'input-error' : ''} />
                        <label htmlFor="price">Complexity:</label>
                        <input type="number" id="price" min={0} max={5} step={0.01} onChange={(e) => setComplexity(parseFloat(e.target.value))} value={complexity} className={error ? 'input-error' : ''} />
                        <div className={error ? 'select-categories-error' : 'select-categories'}>
                            <p>Select categories:</p>
                            {allCategories.map((category: string) => (
                                <div key={category}>
                                    <Checkbox checked={false} categoryInput={category} handleChange={handleChange} />
                                </div>
                            ))}
                        </div>
                        <button>Submit</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                }
            </div>
        </>
    );
};

export default New;