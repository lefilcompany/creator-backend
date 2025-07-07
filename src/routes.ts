import { Router } from "express";
import mountRoutes from "./utils/mountRoutes";
import { teamRouter } from "./controllers/teamController";
import userRoute from "./controllers/userController";
import solicitationRouter from "./controllers/solicitationController";

const router = Router();

mountRoutes(router, [userRoute, teamRouter, solicitationRouter]);

export default router;