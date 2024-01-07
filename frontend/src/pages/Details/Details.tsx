import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './details.css';
import Loading from "../../components/Loading/Loading";

const Details = () => {
    type Game = {
        _id: string,
        title: string,
        category: string[],
        rating: number,
        complexity: number,
        price: number,
        imageUrl: string
    };

    const [game, setGame] = useState<Game>();
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGame = async () => {
            const response = await fetch(`/api/games/${id}`);
            const json = await response.json();
            setGame(json);
        };

        fetchGame();

    }, []);

    const deleteGame = async () => {
        const response = await fetch(`/api/games/${id}`, {
            method: 'DELETE'
        });

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
            {!game &&
                <Loading />
            }
            <div className="container">
                {game &&
                    <div className="game-details">
                        <h1>{game.title}</h1>
                        {error && <div className="error">{error}</div>}
                        <div className="buttons">
                            <Link to={`/edit/${game._id}`} state={game}><button className="edit"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg></button></Link>
                            <button className="delete" onClick={deleteGame}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z"></path></svg></button>
                        </div>
                        <img src={game.imageUrl} alt={game.title} />
                        <div className="category-container">
                            {game.category.map((element, i) => (
                                <div key={i} className="category-bubble">{element}</div>
                            ))}
                        </div>
                        <p className="price">Price: {game.price}&euro;</p>
                        <p className="rating">Rating: {game.rating}/10</p>
                        <p className="complexity">Complexity: {game.complexity}/5</p>
                    </div>
                }
            </div>
        </>
    );
};

export default Details;