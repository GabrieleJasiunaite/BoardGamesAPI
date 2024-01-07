import express from 'express';
import * as controller from '../controllers/controller.js';

const router = express.Router();

router.get('/games', controller.games_get);
router.post('/games', controller.games_post);
router.get('/games/categories', controller.games_categories_get);
router.get('/games/:id', controller.game_get);
router.put('/games/:id', controller.game_put);
router.delete('/games/:id', controller.game_delete);

export default router;