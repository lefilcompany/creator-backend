import { TeamPlanModelInterface } from "../../models/teamPlanModel";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllTeamPlansInput extends ServiceInput {
}

interface GetAllTeamPlansOutput extends ServiceOutput {
    teamPlans: TeamPlanModelInterface[];
}

export class GetAllTeamPlans implements Service {
    private static instance: GetAllTeamPlans;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): GetAllTeamPlans {
        if (!GetAllTeamPlans.instance) {
            GetAllTeamPlans.instance = new GetAllTeamPlans();
        }
        return GetAllTeamPlans.instance;
    }

    public async execute(): Promise<GetAllTeamPlansOutput> {
        const teamPlans = await this.repository.getAllTeamPlans();
        return { 
            teamPlans: teamPlans 
        };
    }
}