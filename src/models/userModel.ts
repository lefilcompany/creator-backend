import { UserInformation } from "../enums/userInformation";
import { UserRoles, UserRoleValidator } from "../utils/userRoles";

class UserModel implements UserRoleValidator {
    private id: number | undefined;
    private userName: string;
    private email: string;
    private password: string;
    private cityUser: string;
    private stateUser: string;
    private roleUser: number | undefined;
    private teamId: number | undefined;
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
        roleUser: number | undefined,
        teamId: number | undefined,
        isDeleted?: number,
        stripeCustomerId?: string | null,
        updatedAt: Date | null = null
    ) {
        this.id = id;

        if (!userName || userName.trim() === "") {
            throw new Error(UserInformation.USERNAME_REQUIRED);
        }
        this.userName = userName;

        if (!email || email.trim() === "") {
            throw new Error(UserInformation.EMAIL_REQUIRED);
        }
        this.email = email;

        if (!password || password.trim() === "") {
            throw new Error(UserInformation.PASSWORD_REQUIRED);
        }
        this.password = password;

        if (!cityUser || cityUser.trim() === "") {
            throw new Error(UserInformation.CITY_REQUIRED);
        }
        this.cityUser = cityUser;

        if (!stateUser || stateUser.trim() === "") {
            throw new Error(UserInformation.STATE_REQUIRED);
        }
        this.stateUser = stateUser;

        this.roleUser = roleUser !== null ? roleUser : UserRoles.NEW_USER;
        this.teamId = teamId;
        this.isDeleted = isDeleted ?? 0;
        this.stripeCustomerId = stripeCustomerId ?? null;
        this.createdAt = new Date();
        this.updatedAt = updatedAt;
    }

    public canCreateTeam(): boolean {
        return this.roleUser === UserRoles.NEW_USER || this.roleUser === UserRoles.SYSTEM_ADMIN;
    }

    public canManageTeam(): boolean {
        return this.roleUser === UserRoles.TEAM_ADMIN || this.roleUser === UserRoles.SYSTEM_ADMIN;
    }

    public canUseAIFeatures(): boolean {
        return this.roleUser !== null && this.roleUser !== UserRoles.NEW_USER;
    }

    public canJoinTeam(): boolean {
        return this.roleUser === UserRoles.NEW_USER;
    }

    public getRoleDescription(): string {
        switch (this.roleUser) {
            case UserRoles.NEW_USER:
                return UserInformation.NEW_USER;
            case UserRoles.TEAM_ADMIN:
                return UserInformation.TEAM_ADMIN;
            case UserRoles.TEAM_MEMBER:
                return UserInformation.TEAM_MEMBER;
            case UserRoles.SYSTEM_ADMIN:
                return UserInformation.SYSTEM_ADMIN;
            default:
                return UserInformation.ROLE_UNKNOWN;
        }
    }

    public promoteToAdmin(teamId: number): void {
        if (this.roleUser !== UserRoles.NEW_USER) {
            throw new Error(UserInformation.USER_WITH_TEAM);
        }

        this.roleUser = UserRoles.TEAM_ADMIN;
        this.teamId = teamId;
        this.updatedAt = new Date();
    }

    public joinTeamAsMember(teamId: number): void {
        if (this.roleUser !== UserRoles.NEW_USER) {
            throw new Error(UserInformation.USER_WITH_TEAM);
        }

        this.roleUser = UserRoles.TEAM_MEMBER;
        this.teamId = teamId;
        this.updatedAt = new Date();
    }

    public leaveTeam(): void {
        if (this.roleUser === UserRoles.NEW_USER) {
            throw new Error(UserInformation.USER_WITHOUT_TEAM);
        }

        this.roleUser = UserRoles.NEW_USER;
        this.teamId = undefined;
        this.updatedAt = new Date();
    }

    public promoteToSystemAdmin(): void {
        if (this.roleUser !== UserRoles.SYSTEM_ADMIN) {
            throw new Error(UserInformation.USER_WITH_TEAM);
        }
        this.roleUser = UserRoles.SYSTEM_ADMIN;
        this.updatedAt = new Date();
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

    public getRoleUser(): number | undefined {
        return this.roleUser;
    }

    public getTeamId(): number | undefined {
        return this.teamId;
    }

    public getIsDeleted(): number {
        return this.isDeleted ? this.isDeleted : 0;
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
    roleUser: number | undefined;
    teamId: number | undefined;
    isDeleted?: number;
    stripeCustomerId?: string | null;
    createdAt: Date | undefined;
    updatedAt: Date | null;
}