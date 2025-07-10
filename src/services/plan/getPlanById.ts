import { PlanModelInterface } from "../../models/planModel";
import { PlanRepository } from "../../repository/planRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetPlanByIdInput extends ServiceInput {
    id: number;
}

interface GetPlanByIdOutput extends ServiceOutput {
    plan: PlanModelInterface | null;
}

export class GetPlanById implements Service {
    private static instance: GetPlanById;
    private repository: PlanRepository; 

    private constructor() {
        this.repository = PlanRepository.get();
    }
    
    public static getInstance(): GetPlanById {
        if (!GetPlanById.instance) {
            GetPlanById.instance = new GetPlanById();
        }
        return GetPlanById.instance;
    }

    public async execute({ id }: GetPlanByIdInput): Promise<GetPlanByIdOutput> {
        const plan = await this.repository.getPlanById(id);
        return {
            plan: plan,
        };
    }
}