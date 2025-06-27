class TeamModel {
    private id: number | undefined;
    private nameTeam: string;
    private accessCode: string;
    private createdAt: Date;
    private updatedAt: Date | null;
    private isDeleted?: number;

    constructor(
        id: number | undefined,
        nameTeam: string,
        accessCode: string,
        updatedAt: Date | null = null,
        isDeleted?: number
    ) {
        this.id = id;

        if (!nameTeam || nameTeam.trim() === "") {
            throw new Error(TeamErros.NAMETEAM_REQUIRED);
        }
        this.nameTeam = nameTeam;
        
        if (!accessCode || accessCode.trim() === "") {
            throw new Error(TeamErros.ACCESSCODE_REQUIRED);
        }
        this.accessCode = accessCode;
        this.createdAt = new Date();
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted ?? 0;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getNameTeam(): string {
        return this.nameTeam;
    }

    public getAccessCode(): string {
        return this.accessCode;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date | null {
        return this.updatedAt;
    }

    public getIsDeleted(): number {
        return this.isDeleted ? this.isDeleted : 0;
    }
}

export default TeamModel;

export interface TeamModelInterface {
    id: number | undefined;
    nameTeam: string;
    accessCode: string;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted?: number;
}

export enum TeamErros {
    NAMETEAM_REQUIRED = 'O nome da equipe é obrigatório',
    ACCESSCODE_REQUIRED = 'O código de acesso é obrigatório',
    TEAM_NOT_FOUND = 'Equipe não encontrada',
    TEAM_ACCESS_CODE_ALREADY_EXISTS = 'Já existe uma equipe com esse código de acesso'
}