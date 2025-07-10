import TeamPlanModel, { TeamPlanModelInterface } from "../../models/teamPlanModel";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface CreateTeamPlanInput extends ServiceInput {
    teamPlan: TeamPlanModelInterface;
}

interface CreateTeamPlanOutput extends ServiceOutput {
    teamPlan: TeamPlanModelInterface;
}

export class CreateTeamPlan implements Service {
    private static instance: CreateTeamPlan;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): CreateTeamPlan {
        if (!CreateTeamPlan.instance) {
            CreateTeamPlan.instance = new CreateTeamPlan();
        }
        return CreateTeamPlan.instance;
    }

    public async execute({ teamPlan }: CreateTeamPlanInput): Promise<CreateTeamPlanOutput> {
        const teamPlanObj = new TeamPlanModel(
            teamPlan.id,
            teamPlan.teamId,
            teamPlan.planId,
            teamPlan.endDate,
            teamPlan.updatedAt,
            0
        )

        const createdTeamPlan = await this.repository.createTeamPlan(teamPlanObj);

        return {
            teamPlan: createdTeamPlan
        };
    }
}