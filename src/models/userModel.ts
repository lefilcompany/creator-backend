class UserModel {
    private id: number | undefined;
    private userName: string;
    private email: string;
    private password: string;
    private cityUser: string;
    private stateUser: string;
    private roleUser: number | null;
    private teamId: number | null;
    private isDeleted?: number;
    private stripeCustomerId: string | null;
    private createdAt: Date;
    private updatedAt: Date | null;

    constructor(
        id: number | undefined,
        userName: string,
        email: string,
        password: string,
        cityUser: string,
        stateUser: string,
        roleUser: number | null,
        teamId: number | null,
        stripeCustomerId?: string | null,
        updatedAt: Date | null = null
    ) {
        this.id = id;

        if (!userName || userName.trim() === "") {
            throw new Error(UserErros.USERNAME_REQUIRED);
        }
        this.userName = userName;

        if (!email || email.trim() === "") {
            throw new Error(UserErros.EMAIL_REQUIRED);
        }
        this.email = email;

        if (!password || password.trim() === "") {
            throw new Error(UserErros.PASSWORD_REQUIRED);
        }
        this.password = password;

        if (!cityUser || cityUser.trim() === "") {
            throw new Error(UserErros.CITY_REQUIRED);
        }
        this.cityUser = cityUser;

        if (!stateUser || stateUser.trim() === "") {
            throw new Error(UserErros.STATE_REQUIRED);
        }
        this.stateUser = stateUser;

        this.roleUser = roleUser;
        this.teamId = teamId;
        this.isDeleted = 0;
        this.stripeCustomerId = stripeCustomerId ?? null;
        this.createdAt = new Date();
        this.updatedAt = updatedAt;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUsername(): string {
        return this.userName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getCityUser(): string {
        return this.cityUser;
    }

    public getStateUser(): string {
        return this.stateUser;
    }

    public getRoleUser(): number | null {
        return this.roleUser;
    }

    public getTeamId(): number | null {
        return this.teamId;
    }

    public getIsDeleted(): number {
        return this.isDeleted? this.isDeleted : 0;
    }

    public getStripeCustomerId(): string | null {
        return this.stripeCustomerId;
    }
    
    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date | null {
        return this.updatedAt;
    }
}

export default UserModel;

export interface UserModelInterface {
    id: number | undefined;
    userName: string;
    email: string;
    password: string;
    cityUser: string;
    stateUser: string;
    roleUser: number | null;
    teamId: number | null;
    isDeleted?: number;
    stripeCustomerId?: string | null;
    createdAt: Date | undefined;
    updatedAt: Date | null;
}

export enum UserErros {
    USERNAME_REQUIRED = "O nome do usuário é obrigatório.",
    EMAIL_REQUIRED = "O email é obrigatório.",
    PASSWORD_REQUIRED = "A senha é obrigatória.",
    CITY_REQUIRED = "A cidade é obrigatória.",
    STATE_REQUIRED = "O estado é obrigatório."
}