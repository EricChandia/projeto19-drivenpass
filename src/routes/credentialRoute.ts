import { Router } from "express";
import { createCredential } from "../controllers/credentialController";
import { validateSchema } from "../middlewares/schemaValidator";
import { credentialSchema } from "../schemas/credentialSchema";
import { validateToken } from "../middlewares/tokenMiddleware";

const credentialRoute = Router();

credentialRoute.post("/createCredential", validateToken, validateSchema(credentialSchema), createCredential);
//authRoute.post("/signIn", validateSchema(userSchema), signIn);


export default credentialRoute;