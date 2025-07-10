import { PlanModelInterface } from "../../models/planModel";
import { PlanRepository } from "../../repository/planRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface getAllActivePlans extends ServiceInput {
}

interface GetAllActivePlansOutput extends ServiceOutput {
    plans: PlanModelInterface[];
}

export class GetAllActivePlans implements Service {
    private static instance: GetAllActivePlans;
    private repository: PlanRepository; 

    private constructor() {
        this.repository = PlanRepository.get();
    }
    
    public static getInstance(): GetAllActivePlans {
        if (!GetAllActivePlans.instance) {
            GetAllActivePlans.instance = new GetAllActivePlans();
        }
        return GetAllActivePlans.instance;
    }

    public async execute(): Promise<GetAllActivePlansOutput> {
        const plans = await this.repository.getAllActivePlans();
        return {
            plans: plans,
        };
    }
}