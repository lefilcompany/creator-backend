import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";
import teamRouter from "./controllers/teamController";
import userRoute from "./controllers/userController";
import solicitationRouter from "./controllers/solicitationController";
import planRoute from "./controllers/planController";
import teamPlanRoute from "./controllers/teamPlanController";

const router = Router();

mountRoutes(router, [userRoute, teamRouter, solicitationRouter, planRoute, teamPlanRoute]);

export default router;