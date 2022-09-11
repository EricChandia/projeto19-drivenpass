import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator";
import { secureNoteSchema } from "../schemas/secureNoteSchema";
import { validateToken } from "../middlewares/tokenMiddleware";
import { createSecureNote, deleteSecureNote, getSecureNoteById, getSecureNotes } from "../controllers/secureNoteController";

const secureNoteRouter = Router();

secureNoteRouter.post("/createSecureNote", validateToken, validateSchema(secureNoteSchema), createSecureNote);
secureNoteRouter.get("/getSecureNotes", validateToken, getSecureNotes);
secureNoteRouter.get("/getSecureNote/:id", validateToken, getSecureNoteById);
secureNoteRouter.delete("/deleteSecureNote/:id", validateToken, deleteSecureNote);

export default secureNoteRouter;