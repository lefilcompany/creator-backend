import { TeamPlanInformation } from "../../enums/teamPlanInformation";
import { TeamPlanModelInterface } from "../../models/teamPlanModel";
import { TeamPlanRepository } from "../../repository/teamPlanRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface RenewTeamPlanInput extends ServiceInput {
    teamId: number;
    newEndDate: Date;
}

interface RenewTeamPlanOutput extends ServiceOutput {
    teamPlan: TeamPlanModelInterface | null;
}

export class RenewTeamPlan implements Service {
    private static instance: RenewTeamPlan;
    private repository: TeamPlanRepository;

    private constructor() {
        this.repository = TeamPlanRepository.get();
    }

    public static getInstance(): RenewTeamPlan {
        if (!RenewTeamPlan.instance) {
            RenewTeamPlan.instance = new RenewTeamPlan();
        }
        return RenewTeamPlan.instance;
    }

    public async execute({ teamId, newEndDate }: RenewTeamPlanInput): Promise<RenewTeamPlanOutput> {
        const teamPlan = await this.repository.getTeamPlanByTeamId(teamId);

        if (!teamPlan) {
            throw new Error(TeamPlanInformation.TEAM_PLAN_NOT_FOUND);
        }

        if (newEndDate <= new Date()) {
            throw new Error(TeamPlanInformation.END_DATE_INVALID);
        }


        const renewedTeamPlan = await this.repository.renewTeamPlan(teamPlan.id, newEndDate);

        return {
            teamPlan: renewedTeamPlan
        };
    }
}