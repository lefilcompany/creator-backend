import { TeamPlanInformation } from "../enums/teamPlanInformation";
import { TeamPlanRepository } from "../repository/teamPlanRepository";
import { CreateTeamPlan } from "../services/teamPlan/createTeamPlan";
import { DeleteTeamPlan } from "../services/teamPlan/deleteTeamPlan";
import { GetAllActiveTeamPlans } from "../services/teamPlan/getAllActiveTeamPlans";
import { GetAllTeamPlans } from "../services/teamPlan/getAllTeamPlans";
import { GetTeamPlanById } from "../services/teamPlan/getTeamPlanById";
import { RenewTeamPlan } from "../services/teamPlan/renewTeamPlan";
import { UpdateTeamPlan } from "../services/teamPlan/updateTeamPlan";
import { handleError } from "../utils/errorHandler";
import { AppRoute } from "./AppRoute";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const teamPlanRoute = new AppRoute('teamPlan');

teamPlanRoute.routes.get('/', async (_, res) => {
    try {
        const teamPlanService = GetAllTeamPlans.getInstance();
        const teamPlans = await teamPlanService.execute();

        res.status(200).json(teamPlans)
    } catch (error: any) {
        handleError(res, error);
    }
});

teamPlanRoute.routes.get('/active', async (_, res) => {
    try {
        const teamPlanService = GetAllActiveTeamPlans.getInstance();
        const activeTeamPlans = await teamPlanService.execute();

        res.status(200).json(activeTeamPlans);
    } catch (error: any) {
        handleError(res, error);
    }
});

teamPlanRoute.routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const teamPlanService = GetTeamPlanById.getInstance();
        const teamPlan = await teamPlanService.execute({ id: Number(id) });

        if (!teamPlan) {
            throw new Error(TeamPlanInformation.TEAM_PLAN_NOT_FOUND);
        }

        res.status(200).json(teamPlan);
    } catch (error: any) {
        handleError(res, error);
    }
});

teamPlanRoute.routes.post("/", async (req, res) => {
    try {
        const teamId = req.body.teamId as number;
        const planId = req.body.planId as number;
        const endDateStr = req.body.endDate as string;

        if (!teamId || !planId || !endDateStr) {
            throw new Error(TeamPlanInformation.MISSING_REQUIRED_FIELDS);
        }

        const parsedEndDate = dayjs(endDateStr, "DD/MM/YYYY").toDate();

        if (isNaN(parsedEndDate.getTime())) {
            throw new Error(TeamPlanInformation.INVALID_DATE_FORMAT);
        }

        const teamPlanService = CreateTeamPlan.getInstance();
        const { teamPlan } = await teamPlanService.execute({
            teamPlan: {
                id: undefined,
                teamId,
                planId,
                endDate: parsedEndDate,
                createdAt: undefined,
                updatedAt: null,
                isDeleted: 0
            }
        });

        res.status(201).json(teamPlan);
    } catch (error: any) {
        handleError(error, res);
    }
});

teamPlanRoute.routes.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const teamPlanRepository = TeamPlanRepository.get();
        const existingTeamPlan = await teamPlanRepository.getTeamPlanById(Number(id));

        if (!existingTeamPlan) {
            throw new Error(TeamPlanInformation.TEAM_PLAN_NOT_FOUND);
        }
        
        const teamId = req.body.teamId as number;
        const planId = req.body.planId as number;
        const endDateStr = req.body.endDate as string;

        if (!teamId || !planId || !endDateStr) {
            throw new Error(TeamPlanInformation.MISSING_REQUIRED_FIELDS);
        }

        const parsedEndDate = dayjs(endDateStr, "DD/MM/YYYY").toDate();

        if (isNaN(parsedEndDate.getTime())) {
            throw new Error(TeamPlanInformation.INVALID_DATE_FORMAT);
        }

        const teamPlanService = UpdateTeamPlan.getInstance();
        const updatedTeamPlan = await teamPlanService.execute({
            teamPlan: {
                id: Number(id),
                teamId: teamId ?? existingTeamPlan.teamId,
                planId: planId ?? existingTeamPlan.planId,
                endDate: parsedEndDate ?? existingTeamPlan.endDate,
                createdAt: existingTeamPlan.createdAt,
                updatedAt: new Date(),
                isDeleted: existingTeamPlan.isDeleted
            }
        });

        res.status(200).json(updatedTeamPlan);
    } catch (error: any) {
        handleError(error, res);
    }
});

teamPlanRoute.routes.put("/renew/:teamId", async (req, res) => {
    try {
        const { teamId } = req.params;
        const { newEndDate } = req.body;

        if (!teamId || !newEndDate) {
            throw new Error(TeamPlanInformation.MISSING_REQUIRED_FIELDS);
        }

        const parsedNewEndDate = dayjs(newEndDate, "DD/MM/YYYY").toDate();

        if (isNaN(parsedNewEndDate.getTime())) {
            throw new Error(TeamPlanInformation.INVALID_DATE_FORMAT);
        }

        const renewTeamPlanService = RenewTeamPlan.getInstance();
        const renewTeamPlan = await renewTeamPlanService.execute({
            teamId: Number(teamId),
            newEndDate: parsedNewEndDate
        });

        res.status(200).json(renewTeamPlan);
    } catch (error: any) {
        handleError(error, res);
    }
});

teamPlanRoute.routes.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const teamPlanRepository = TeamPlanRepository.get();
        const existingTeamPlan = await teamPlanRepository.getTeamPlanById(Number(id));

        if (!existingTeamPlan) {
            throw new Error(TeamPlanInformation.TEAM_PLAN_NOT_FOUND);
        }

        const teamPlanService = DeleteTeamPlan.getInstance();
        await teamPlanService.execute({ id: Number(id) });

        res.status(200).json(
            { message: TeamPlanInformation.TEAM_PLAN_DELETED }
        );
    } catch (error: any) {
        handleError(error, res);
    }
});

export default teamPlanRoute;