var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import Game from "../models/boardGame.js";
// GET all games
export const games_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield Game.find({});
        return res.status(200).json(games);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
    ;
});
// POST a game
export const games_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, price, imageUrl, complexity, rating } = req.body;
    try {
        const game = yield Game.create({ title, category, price, imageUrl, complexity, rating });
        if (!game) {
            return res.status(400).json({ error: 'Could not create a game' });
        }
        ;
        return res.status(200).json(game);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
    ;
});
// GET one game
export const game_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This game does not exist" });
    }
    ;
    try {
        const game = yield Game.findById(id);
        return res.status(200).json(game);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
    ;
});
// EDIT a game
export const game_put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This game does not exist" });
    }
    try {
        const game = yield Game.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        if (!game) {
            return res.status(400).json({ error: 'Could not edit the game' });
        }
        ;
        return res.status(200).json(game._id);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
    ;
});
// DELETE one game
export const game_delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This game does not exist" });
    }
    ;
    try {
        const game = yield Game.findByIdAndDelete(id);
        if (!game) {
            return res.status(400).json({ error: 'Could not delete the game' });
        }
        ;
        return res.status(200).json(game);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
    ;
});
// GET all categories
export const games_categories_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Game.aggregate([
            { $unwind: "$category" },
            { $group: { _id: "$category" } }
        ]);
        return res.status(200).json(categories);
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
    ;
});
