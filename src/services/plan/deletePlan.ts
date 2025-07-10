import { PlanInformation } from "../../enums/planInformation";
import { PlanRepository } from "../../repository/planRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface DeletePlanInput extends ServiceInput {
    id: number;
}

interface DeletePlanOutput extends ServiceOutput {
    message: string;
}

export class DeletePlan implements Service {
    private static instance: DeletePlan;
    private repository: PlanRepository;

    private constructor() {
        this.repository = PlanRepository.get();
    }

    public static getInstance(): DeletePlan {
        if (!DeletePlan.instance) {
            DeletePlan.instance = new DeletePlan();
        }
        return DeletePlan.instance;
    }

    public async execute({ id }: DeletePlanInput): Promise<DeletePlanOutput> {
        await this.repository.deletePlan(id);
        return {
            message: PlanInformation.PLAN_DELETED
        }
    }
}