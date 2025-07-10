import { Decimal } from "@prisma/client/runtime/library";
import { PlanInformation } from "../enums/planInformation";
import { PlanRepository } from "../repository/planRepository";
import { CreatePlan } from "../services/plan/createPlan";
import { DeletePlan } from "../services/plan/deletePlan";
import { GetAllActivePlans } from "../services/plan/getAllActivePlans";
import { GetAllPlans } from "../services/plan/getAllPlans";
import { GetPlanById } from "../services/plan/getPlanById";
import { UpdatePlan } from "../services/plan/updatePlan";
import { handleError } from "../utils/errorHandler";
import { AppRoute } from "./AppRoute";
import { validateToken } from "../middlewares/validateToken";

const planRoute = new AppRoute('plan');

planRoute.routes.get('/', validateToken, async (_, res) => {
    try {
        const planService = GetAllPlans.getInstance();
        const plans = await planService.execute();

        res.status(200).json(plans);
    } catch (error: any) {
        handleError(error, res);
    }
});

planRoute.routes.get('/active', validateToken, async (_, res) => {
    try {
        const planService = GetAllActivePlans.getInstance();
        const activePlans = await planService.execute();

        res.status(200).json(activePlans);
    } catch (error: any) {
        handleError(error, res);
    }
});

planRoute.routes.get('/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const planService = GetPlanById.getInstance();
        const plan = await planService.execute({ id: Number(id) });

        if (!plan) {
            throw new Error("Plan not found");
        }

        res.status(200).json(plan);
    } catch (error: any) {
        handleError(error, res);
    }
});

planRoute.routes.post('/', validateToken, async (req, res) => {
    try {
        const name = req.body.name as string;
        const price = req.body.price as number | Decimal;
        const membersLimit = req.body.membersLimit as number;
        const brandsLimit = req.body.brandsLimit as number;
        const themesLimit = req.body.themesLimit as number;
        const personasLimit = req.body.personasLimit as number;
        const contentLimit = req.body.contentLimit as number;
        const planningLimit = req.body.planningLimit as number;
        const reviewLimit = req.body.reviewLimit as number;

        const planService = CreatePlan.getInstance();
        const newPlan = await planService.execute({
            plan: {
                id: undefined,
                name,
                price,
                membersLimit,
                brandsLimit,
                themesLimit,
                personasLimit,
                contentLimit,
                planningLimit,
                reviewLimit,
                createdAt: undefined,
                updatedAt: null,
                isDeleted: 0
            }
        });

        res.status(201).json(newPlan);
    } catch (error: any) {
        handleError(error, res);
    }
});

planRoute.routes.put('/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const planRepository = PlanRepository.get();

        const existingPlan = await planRepository.getPlanById(Number(id));
        if (!existingPlan) {
            throw new Error(PlanInformation.PLAN_NOT_FOUND);
        }

        const {
            name,
            price,
            membersLimit,
            brandsLimit,
            themesLimit,
            personasLimit,
            contentLimit,
            planningLimit,
            reviewLimit
        } = req.body;

        const planService = UpdatePlan.getInstance();
        const updatedPlan = await planService.execute({
            plan: {
                id: Number(id),
                name: name ?? existingPlan.name,
                price: price ?? existingPlan.price,
                membersLimit: membersLimit ?? existingPlan.membersLimit,
                brandsLimit: brandsLimit ?? existingPlan.brandsLimit,
                themesLimit: themesLimit ?? existingPlan.themesLimit,
                personasLimit: personasLimit ?? existingPlan.personasLimit,
                contentLimit: contentLimit ?? existingPlan.contentLimit,
                planningLimit: planningLimit ?? existingPlan.planningLimit,
                reviewLimit: reviewLimit ?? existingPlan.reviewLimit,
                createdAt: existingPlan.createdAt,
                updatedAt: new Date(),
                isDeleted: existingPlan.isDeleted
            }
        });

        res.status(200).json(updatedPlan);
    } catch (error: any) {
        handleError(error, res);
    }
});

planRoute.routes.delete('/:id', validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const planRepository = PlanRepository.get();

        const existingPlan = await planRepository.getPlanById(Number(id));
        if (!existingPlan) {
            throw new Error(PlanInformation.PLAN_NOT_FOUND);
        }

        const planService = DeletePlan.getInstance();
        await planService.execute({ id: Number(id) });

        res.status(200).json(
            { message: PlanInformation.PLAN_DELETED }
        );
    } catch (error: any) {
        handleError(error, res);
    }
});

export default planRoute;