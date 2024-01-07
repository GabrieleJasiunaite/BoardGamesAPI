import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import './games.css';

export default function Games({ selectedCategory }: { selectedCategory: string }) {
    const [games, setGames] = useState<gameObj[]>();
    const [error, setError] = useState<string | null>(null);

    type gameObj = {
        _id: string,
        category: string[],
        complexity: number,
        imageUrl: string,
        price: number,
        rating: number,
        title: string
    }

    // loads games based on the selected category
    useEffect(() => {
        const fetchGames = async () => {
            if (selectedCategory !== "") {
                const response = await fetch('/api/games');

                if (response.status === 500) {
                    setError('Can not connect to server');
                    return;
                };

                const json = await response.json();

                if (selectedCategory !== "all") {
                    setGames(json.filter((game: gameObj) => game.category.includes(selectedCategory)))
                    setError(null);
                } else {
                    setGames(json);
                    setError(null);
                };
            };
        };

        fetchGames();

    }, [selectedCategory]);

    return (
        <>
            {error && <div className="error">{error}</div>}
            {(!games && !error) &&
                <Loading />
            }
            <div className="container">
                {games &&
                    <div className="game-display">
                        {games.map((game: gameObj) => (
                            <Link to={`/game/${game._id}`} key={game._id}>
                                <div className="game-card">
                                    <div className="img-container">
                                        <img src={game.imageUrl} alt={game.title} />
                                    </div>
                                    <div className="info-container">
                                        <h3>{game.title}</h3>
                                        <p className="rating">Rating: <strong>{game.rating}/10</strong></p>
                                    </div>
                                </div>
                            </Link>
                        ))
                        }
                    </div>
                }
            </div>
        </>
    );
};