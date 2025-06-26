class UserModel {
    private id: number | undefined;
    private username: string;
    private email: string;
    private password: string;
    private cityUser: string;
    private stateUser: string;
    private roleUser: number | null;
    private teamId: number | null;
    private createdAt: Date;
    private updatedAt: Date | null;
    private isDeleted: number;
    private stripeCustomerId: string | null;

    constructor(
        id: number | undefined,
        username: string,
        email: string,
        password: string,
        cityUser: string,
        stateUser: string,
        roleUser: number | null,
        teamId: number | null,
        isDeleted: number,
        stripeCustomerId: string | null
    ) {
        this.id = id;

        if (!username || username.trim() === "") {
            throw new Error(UserErros.USERNAME_REQUIRED);
        }
        this.username = username;

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
        this.createdAt = new Date();
        this.updatedAt = null;
        this.isDeleted = isDeleted;
        this.stripeCustomerId = stripeCustomerId;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
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

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date | null {
        return this.updatedAt;
    }

    public getIsDeleted(): number {
        return this.isDeleted;
    }

    public getStripeCustomerId(): string | null {
        return this.stripeCustomerId;
    }
}

export default UserModel;

export interface UserModelInterface {
    id: number | undefined;
    username: string;
    email: string;
    password: string;
    cityUser: string;
    stateUser: string;
    roleUser: number | null;
    teamId: number | null;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted: number;
    stripeCustomerId: string | null;
}

export enum UserErros {
    USERNAME_REQUIRED = "O nome do usuário é obrigatório.",
    EMAIL_REQUIRED = "O email é obrigatório.",
    PASSWORD_REQUIRED = "A senha é obrigatória.",
    CITY_REQUIRED = "A cidade é obrigatória.",
    STATE_REQUIRED = "O estado é obrigatório."
}