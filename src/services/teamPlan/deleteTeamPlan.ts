import { TeamPlanInformation } from "../../enums/teamPlanInformation";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface DeleteTeamPlanInput extends ServiceInput {
    id: number;
}

interface DeleteTeamPlanOutput extends ServiceOutput {
    message: string;
}

export class DeleteTeamPlan implements Service {
    private static instance: DeleteTeamPlan;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): DeleteTeamPlan {
        if (!DeleteTeamPlan.instance) {
            DeleteTeamPlan.instance = new DeleteTeamPlan();
        }
        return DeleteTeamPlan.instance;
    }

    public async execute({ id }: DeleteTeamPlanInput): Promise<DeleteTeamPlanOutput> {
        await this.repository.deleteTeamPlan(id);
        return { 
            message: TeamPlanInformation.TEAM_PLAN_DELETED 
        };
    }
}