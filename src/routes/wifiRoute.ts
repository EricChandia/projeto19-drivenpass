import { Router } from "express";

import { validateSchema } from "../middlewares/schemaValidator";
import { wifiSchema } from "../schemas/wifiSchema";
import { validateToken } from "../middlewares/tokenMiddleware";
import { createWifi, deleteWifi, getWifiById, getWifis } from "../controllers/wifiController";


const wifiRoute = Router();

wifiRoute.post("/createWifi", validateToken, validateSchema(wifiSchema), createWifi);
wifiRoute.get("/getWifis", validateToken, getWifis);
wifiRoute.get("/getWifi/:id", validateToken, getWifiById);
wifiRoute.delete("/deleteWifi/:id", validateToken, deleteWifi);

export default wifiRoute;