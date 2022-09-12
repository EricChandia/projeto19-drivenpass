import { Router } from "express";
import authRoute from "./authRoute";
import credentialRoute from "./credentialRoute";
import secureNoteRoute from "./secureNoteRoutes";
import cardRoute from "./cardRoute";
import wifiRoute from "./wifiRoute";

const router = Router();
router.use(authRoute);
router.use(credentialRoute);
router.use(secureNoteRoute);
router.use(cardRoute);
router.use(wifiRoute);

export default router;