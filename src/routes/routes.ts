import { Router } from "express";
import authRoute from "./authRoute";
import credentialRoute from "./credentialRoute";
// import paymentRoute from "./paymentRoute";

const router = Router();
router.use(authRoute);
router.use(credentialRoute);
// router.use(paymentRoute);

export default router;