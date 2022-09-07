import { Router } from "express";
import authRoute from "./authRoute";
// import rechargeRoute from "./rechargeRoute";
// import paymentRoute from "./paymentRoute";

const router = Router();
router.use(authRoute);
// router.use(rechargeRoute);
// router.use(paymentRoute);

export default router;