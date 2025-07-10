import { PlanInformation } from "../../enums/planInformation";
import PlanModel, { PlanModelInterface } from "../../models/planModel";
import { PlanRepository } from "../../repository/planRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreatePlanInput extends ServiceInput {
    plan: PlanModelInterface;
}

interface CreatePlanOutput extends ServiceOutput {
    plan: PlanModelInterface;
}

export class CreatePlan implements Service {
    private static instance: CreatePlan;
    private repository: PlanRepository;

    private constructor() {
        this.repository = PlanRepository.get();
    }

    public static getInstance(): CreatePlan {
        if (!CreatePlan.instance) {
            CreatePlan.instance = new CreatePlan();
        }
        return CreatePlan.instance;
    }

    public async execute({ plan }: CreatePlanInput): Promise<CreatePlanOutput> {
        try {
            const planObj = new PlanModel(
                plan.id,
                plan.name,
                plan.price,
                plan.membersLimit,
                plan.brandsLimit,
                plan.themesLimit,
                plan.personasLimit,
                plan.contentLimit,
                plan.planningLimit,
                plan.reviewLimit,
                plan.updatedAt,
                0
            )

            const createdPlan = await this.repository.createPlan(planObj);
            return {
                plan: createdPlan
            };
        } catch (error) {
            throw new Error(PlanInformation.PLAN_ERROR_CREATE + (error instanceof Error ? error.message : String(error)));
        }
    }
}