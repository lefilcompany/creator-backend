import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";
import { teamRouter } from "./controllers/teamController";
import userRoute from "./controllers/userController";

const router = Router();

mountRoutes(router, [userRoute, teamRouter]);

export default router;