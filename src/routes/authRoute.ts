import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import { validateSchema } from "../middlewares/schemaValidator";
import { userSchema } from "../schemas/userSchema";

const authRoute = Router();

authRoute.post("/signUp", validateSchema(userSchema), signUp);
authRoute.post("/signIn", validateSchema(userSchema), signIn);


export default authRoute;