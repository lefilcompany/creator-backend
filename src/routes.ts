import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";
import { userRoute } from "./controllers/userController";
import { teamRouter } from "./controllers/teamController";

const router = Router();

mountRoutes(router, [userRoute, teamRouter]);

export default router;