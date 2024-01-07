import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IGame {
    title: string,
    category: mongoose.Types.Array<string>
    price: number,
    imageUrl: string,
    complexity: number,
    rating: number
};

const gameSchema = new Schema<IGame>({
    title: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    complexity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const Game = mongoose.model<IGame>('Game', gameSchema);

export default Game;