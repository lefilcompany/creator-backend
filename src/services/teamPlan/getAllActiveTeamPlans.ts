import { TeamPlanModelInterface } from "../../models/teamPlanModel";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface GetAllActiveTeamPlansInput extends ServiceInput {

}

interface GetAllActiveTeamPlansOutput extends ServiceOutput {
    teamPlans: TeamPlanModelInterface[];
}

export class GetAllActiveTeamPlans implements Service {
    private static instance: GetAllActiveTeamPlans;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): GetAllActiveTeamPlans {
        if (!GetAllActiveTeamPlans.instance) {
            GetAllActiveTeamPlans.instance = new GetAllActiveTeamPlans();
        }
        return GetAllActiveTeamPlans.instance;
    }

    public async execute(): Promise<GetAllActiveTeamPlansOutput> {
        const teamPlans = await this.repository.getAllActiveTeamPlans();
        return { 
            teamPlans: teamPlans 
        };
    }
}