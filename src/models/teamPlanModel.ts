import { TeamPlanInformation } from "../enums/teamPlanInformation";

class TeamPlanModel {
    private id: number | undefined;
    private teamId: number;
    private planId: number;
    private endDate: Date;
    private createdAt: Date;
    private updatedAt: Date | null;
    private isDeleted: number;

    constructor(
        id: number | undefined,
        teamId: number,
        planId: number,
        endDate: Date,
        updatedAt: Date | null,
        isDeleted: number | null
    ) {
        this.id = id;

        if(!teamId || teamId <= 0) {
            throw new Error(TeamPlanInformation.TEAM_ID_REQUIRED);
        }
        this.teamId = teamId;
        
        if(!planId || planId <= 0) {
            throw new Error(TeamPlanInformation.PLAN_ID_REQUIRED);
        }
        this.planId = planId;

        if (!endDate || isNaN(endDate.getTime())) {
            throw new Error(TeamPlanInformation.END_DATE_REQUIRED);
        }
        this.endDate = endDate;

        this.createdAt = new Date();
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted || 0;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getTeamId(): number {
        return this.teamId;
    }

    public getPlanId(): number {
        return this.planId;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date | null {
        return this.updatedAt;
    }

    public getIsDeleted(): number {
        return this.isDeleted;
    }
}

export default TeamPlanModel;

export interface TeamPlanModelInterface {
    id: number | undefined;
    teamId: number;
    planId: number;
    endDate: Date;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted: number;
}