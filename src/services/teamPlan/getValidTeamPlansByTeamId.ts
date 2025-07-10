import { TeamPlanModelInterface } from "../../models/teamPlanModel";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface getValidTeamPlansByTeamIdInput extends ServiceInput {
    teamId: number;
}

interface getValidTeamPlansByTeamIdOutput extends ServiceOutput {
    teamPlans: TeamPlanModelInterface[];
}

export class GetValidTeamPlansByTeamId implements Service {
    private static instance: GetValidTeamPlansByTeamId;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): GetValidTeamPlansByTeamId {
        if (!GetValidTeamPlansByTeamId.instance) {
            GetValidTeamPlansByTeamId.instance = new GetValidTeamPlansByTeamId();
        }
        return GetValidTeamPlansByTeamId.instance;
    }

    public async execute({ teamId }: getValidTeamPlansByTeamIdInput): Promise<getValidTeamPlansByTeamIdOutput> {
        const teamPlans = await this.repository.getValidTeamPlansByTeamId(teamId);
        return { 
            teamPlans: teamPlans 
        };
    }
}