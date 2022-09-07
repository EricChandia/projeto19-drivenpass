import { Router } from "express";
import { register } from "../controllers/authController";

const cardRouter = Router();

cardRouter.post("/register", register);


export default cardRouter;