import mongoose from "mongoose";
const Schema = mongoose.Schema;
;
const gameSchema = new Schema({
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
const Game = mongoose.model('Game', gameSchema);
export default Game;
