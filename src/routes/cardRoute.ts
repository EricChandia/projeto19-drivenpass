import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator";
import { cardSchema } from "../schemas/cardSchema";
import { validateToken } from "../middlewares/tokenMiddleware";
import { createCard, deleteCard, getCardById, getCards } from "../controllers/cardController";

const cardRoute = Router();

cardRoute.post("/createCard", validateToken, validateSchema(cardSchema), createCard);
cardRoute.get("/getCards", validateToken, getCards);
cardRoute.get("/getCard/:id", validateToken, getCardById);
cardRoute.delete("/deleteCard/:id", validateToken, deleteCard);

export default cardRoute;