import TeamPlanModel, { TeamPlanModelInterface } from "../../models/teamPlanModel";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface UpdateTeamPlanInput extends ServiceInput {
    teamPlan: TeamPlanModelInterface;
}

interface UpdateTeamPlanOutput extends ServiceOutput {
    teamPlan: TeamPlanModelInterface;
}

export class UpdateTeamPlan implements Service {
    private static instance: UpdateTeamPlan;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): UpdateTeamPlan {
        if (!UpdateTeamPlan.instance) {
            UpdateTeamPlan.instance = new UpdateTeamPlan();
        }
        return UpdateTeamPlan.instance;
    }

    public async execute({ teamPlan }: UpdateTeamPlanInput): Promise<UpdateTeamPlanOutput> {
        const teamPlanObj = new TeamPlanModel(
            teamPlan.id,
            teamPlan.teamId,
            teamPlan.planId,
            teamPlan.endDate,
            new Date(),
            0
        );

        const updatedTeamPlan = await this.repository.updateTeamPlan(teamPlanObj);

        return {
            teamPlan: updatedTeamPlan
        };
    }
}