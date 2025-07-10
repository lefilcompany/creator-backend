import PlanModel, { PlanModelInterface } from "../../models/planModel";
import { Service, ServiceInput, ServiceOutput } from "../service";
import { PlanRepository } from "../../repository/planRepository";

interface UpdatePlanInput extends ServiceInput {
    plan: PlanModelInterface;
}

interface UpdatePlanOutput extends ServiceOutput {
    updatedPlan: PlanModelInterface | null;
}

export class UpdatePlan implements Service {
    private static instance: UpdatePlan;
    private repository: PlanRepository;

    private constructor() {
        this.repository = PlanRepository.get();
    }

    public static getInstance(): UpdatePlan {
        if (!UpdatePlan.instance) {
            UpdatePlan.instance = new UpdatePlan();
        }
        return UpdatePlan.instance;
    }

    public async execute({ plan }: UpdatePlanInput): Promise<UpdatePlanOutput> {
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
            new Date(),
            0
        );

        const updatedPlan = await this.repository.updatePlan(planObj);
        return {
            updatedPlan: updatedPlan
        };
    }
}