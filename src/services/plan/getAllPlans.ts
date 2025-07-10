import { PlanModelInterface } from "../../models/planModel";
import { PlanRepository } from "../../repository/planRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllPlansInput extends ServiceInput {

}

interface GetAllPlansOutput extends ServiceOutput {
    plans: PlanModelInterface[];
}

export class GetAllPlans implements Service {
    private static instance: GetAllPlans;
    private repository: PlanRepository; 

    private constructor() {
        this.repository = PlanRepository.get();
    }
    
    public static getInstance(): GetAllPlans {
        if (!GetAllPlans.instance) {
            GetAllPlans.instance = new GetAllPlans();
        }
        return GetAllPlans.instance;
    }

    public async execute(): Promise<GetAllPlansOutput> {
        const plans = await this.repository.getAllPlans();
        return {
            plans: plans,
        };
    }
}