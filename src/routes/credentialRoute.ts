import { Router } from "express";
import { createCredential, deleteCredential, getCredentialById, getCredentials } from "../controllers/credentialController";
import { validateSchema } from "../middlewares/schemaValidator";
import { credentialSchema } from "../schemas/credentialSchema";
import { validateToken } from "../middlewares/tokenMiddleware";

const credentialRoute = Router();

credentialRoute.post("/createCredential", validateToken, validateSchema(credentialSchema), createCredential);
credentialRoute.get("/getCredentials", validateToken, getCredentials);
credentialRoute.get("/getCredential/:id", validateToken, getCredentialById);
credentialRoute.delete("/deleteCredential/:id", validateToken, deleteCredential);

export default credentialRoute;