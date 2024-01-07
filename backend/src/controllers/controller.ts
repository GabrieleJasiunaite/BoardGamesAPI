import mongoose from "mongoose";
import Game from "../models/boardGame.js";
import { Request, Response } from 'express'

// GET all games
export const games_get = async (req: Request, res: Response) => {
    try {
        const games = await Game.find({});
        return res.status(200).json(games);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");

    };
};

// POST a game
export const games_post = async (req: Request, res: Response) => {
    const { title, category, price, imageUrl, complexity, rating } = req.body;

    try {
        const game = await Game.create({ title, category, price, imageUrl, complexity, rating });
        if (!game) {
            return res.status(400).json({ error: 'Could not create a game' });
        };
        return res.status(200).json(game);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");

    };
};

// GET one game
export const game_get = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This game does not exist" })
    };

    try {
        const game = await Game.findById(id);
        return res.status(200).json(game);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    };
};

// EDIT a game
export const game_put = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This game does not exist" })
    }

    try {
        const game = await Game.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

        if (!game) {
            return res.status(400).json({ error: 'Could not edit the game' });
        };
        return res.status(200).json(game!._id);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    };
};

// DELETE one game
export const game_delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This game does not exist" })
    };

    try {
        const game = await Game.findByIdAndDelete(id);
        if (!game) {
            return res.status(400).json({ error: 'Could not delete the game' });
        };
        return res.status(200).json(game);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    };
};

// GET all categories
export const games_categories_get = async (req: Request, res: Response) => {
    try {
        const categories = await Game.aggregate([
            { $unwind: "$category" },
            { $group: { _id: "$category" } }
        ]);

        return res.status(200).json(categories);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    };
};