import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";
import { userRoute } from "./controllers/userController";

const router = Router();

mountRoutes(router, [userRoute]);

export default router;