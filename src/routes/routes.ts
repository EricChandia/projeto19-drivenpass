import { Router } from "express";
import authRoute from "./authRoute";
import credentialRoute from "./credentialRoute";
import secureNoteRoute from "./secureNoteRoutes";
import cardRoute from "./cardRoute";

const router = Router();
router.use(authRoute);
router.use(credentialRoute);
router.use(secureNoteRoute);
router.use(cardRoute);

export default router;