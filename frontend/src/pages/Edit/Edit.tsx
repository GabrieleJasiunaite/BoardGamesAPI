import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CategoriesContext } from "../../context/CategoriesContext";
import Checkbox from "../../components/Checkbox/Checkbox";
import Loading from "../../components/Loading/Loading";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Receives the params passed in the Link in details page
    const location = useLocation();
    const game = location.state;

    const { allCategories, fetchAllCategories } = useContext(CategoriesContext);
    const [error, setError] = useState<string | null>(null);

    // form elements passed to the DB
    const [title, setTitle] = useState<string>(game.title);
    const [imageUrl, setImageUrl] = useState<string>(game.imageUrl);
    const [price, setPrice] = useState<number>(game.price);
    const [rating, setRating] = useState<number>(game.rating);
    const [complexity, setComplexity] = useState<number>(game.complexity);
    const [category, setCategory] = useState<string[]>(game.category);

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

        if (title === "" || category.length === 0 || !price || imageUrl === "" || !complexity || !rating) {
            setError('Please fill out all fields');
            return;
        }

        const response = await fetch(`/api/games/${id}`, {
            method: 'PUT',
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
        }

        if (response.ok) {
            setError(null);
            return navigate(`/game/${id}`)
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
                        <h2>Edit {game.title}</h2>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={error ? 'input-error' : ''} />
                        <label htmlFor="url">Image URL:</label>
                        <input type="text" id="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={error ? 'input-error' : ''} />
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" min={0} value={price} step={0.01} onChange={(e) => setPrice(parseFloat(e.target.value))} className={error ? 'input-error' : ''} />
                        <label htmlFor="rating">Rating: </label>
                        <input type="number" min={1} max={10} step={0.1} value={rating} onChange={(e) => setRating(parseFloat(e.target.value))} className={error ? 'input-error' : ''} />
                        <label htmlFor="price">Complexity:</label>
                        <input type="number" id="price" min={0} max={5} step={0.01} value={complexity} onChange={(e) => setComplexity(parseFloat(e.target.value))} className={error ? 'input-error' : ''} />
                        <div className={error ? 'select-categories-error' : 'select-categories'}>
                            <p>Select categories:</p>
                            {allCategories.map((element: string) => (
                                <div key={element}>
                                    <Checkbox categoryInput={element} checked={game.category.includes(element)} handleChange={handleChange} />
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

export default Edit;