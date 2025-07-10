import { TeamPlanModelInterface } from "../../models/teamPlanModel";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface GetTeamPlanByIdInput extends ServiceInput {
    id: number;
}

interface GetTeamPlanByIdOutput extends ServiceOutput {
    teamPlan: TeamPlanModelInterface | null;
}

export class GetTeamPlanById implements Service {
    private static instance: GetTeamPlanById;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): GetTeamPlanById {
        if (!GetTeamPlanById.instance) {
            GetTeamPlanById.instance = new GetTeamPlanById();
        }
        return GetTeamPlanById.instance;
    }

    public async execute({ id }: GetTeamPlanByIdInput): Promise<GetTeamPlanByIdOutput> {
        const teamPlan = await this.repository.getTeamPlanById(id);
        return { 
            teamPlan: teamPlan 
        };
    }
}