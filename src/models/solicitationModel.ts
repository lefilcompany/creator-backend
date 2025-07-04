import { SolicitationInformation, SolicitationStatus } from "../enums/solicitationInformation";

class SolicitationModel {
    private id: number | undefined;
    private userId: number;
    private teamId: number;
    private status: number;
    private createdAt: Date;
    private updatedAt: Date | null;
    private isDeleted: number;

    constructor(
        id: number | undefined,
        userId: number,
        teamId: number,
        status: number | null,
        updatedAt: Date | null,
        isDeleted: number | null
    ) {
        this.id = id;

        if (!userId) {
            throw new Error(SolicitationInformation.USER_ID_INVALID);
        }
        this.userId = userId;

        if (!teamId) {
            throw new Error(SolicitationInformation.TEAM_ID_INVALID);
        }
        this.teamId = teamId;
        this.status = status || SolicitationStatus.PENDING;
        this.createdAt = new Date(); 
        this.updatedAt = updatedAt || null;
        this.isDeleted = isDeleted || 0;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUserId(): number {
        return this.userId;
    }

    public getTeamId(): number {
        return this.teamId;
    }

    public getStatus(): number {
        return this.status;
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

export default SolicitationModel;

export interface SolicitationModelInterface {
    id: number | undefined;
    userId: number;
    teamId: number;
    status: number;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted: number;
}