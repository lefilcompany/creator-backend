import { UserInformation } from "../enums/userInformation";
import { UserRoles, UserRolesDescriptions, UserRoleValidator } from "../utils/userRoles";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

class UserModel implements UserRoleValidator {
    private id: number | undefined;
    private userName: string;
    private email: string;
    private password: string;
    private cityUser: string;
    private stateUser: string;
    private rolePermission: string
    private roleValue: number;
    private teamId: number | null;
    private createdAt: Date;
    private updatedAt: Date | null;
    private isDeleted: number;
    private stripeCustomerId: string | null;

    constructor(
        id: number | undefined,
        userName: string,
        email: string,
        password: string,
        cityUser: string,
        stateUser: string,
        rolePermission: string | null,
        roleValue: number | null,
        teamId: number | null,
        updatedAt: Date | null,
        isDeleted: number | null,
        stripeCustomerId: string | null,
    ) {
        this.id = id;

        if (!userName || userName.length < 3) {
            throw new Error(UserInformation.USERNAME_REQUIRED);
        }
        this.userName = userName;

        if (!email || !email.includes('@')) {
            throw new Error(UserInformation.EMAIL_REQUIRED);
        }
        this.email = email;

        if (!password || password.length < 6 || password.trim() === '') {
            throw new Error(UserInformation.PASSWORD_REQUIRED);
        }
        this.password = password;

        if (!cityUser || cityUser.trim() === '') {
            throw new Error(UserInformation.CITY_REQUIRED);
        }
        this.cityUser = cityUser;

        if (!stateUser || stateUser.trim() === '') {
            throw new Error(UserInformation.STATE_REQUIRED);
        }
        this.stateUser = stateUser;

        this.rolePermission = rolePermission || UserRolesDescriptions.WITHOUT_TEAM_DESCRIPTION;
        this.roleValue = roleValue || UserRoles.WITHOUT_TEAM;
        this.teamId = teamId || null;
        this.isDeleted = isDeleted || 0;
        this.createdAt = new Date();
        this.updatedAt = updatedAt || null;
        this.stripeCustomerId = stripeCustomerId || null;
    }

    public canCreateTeam(): boolean {
        return this.roleValue === UserRoles.WITHOUT_TEAM || this.roleValue === UserRoles.SYSTEM_ADMIN;
    }

    public canManageTeam(): boolean {
        return this.roleValue === UserRoles.TEAM_ADMIN || this.roleValue === UserRoles.SYSTEM_ADMIN;
    }

    public canUseAIFeatures(): boolean {
        return this.roleValue !== null && this.roleValue !== UserRoles.WITHOUT_TEAM;
    }

    public canJoinTeam(): boolean {
        return this.roleValue === UserRoles.WITHOUT_TEAM;
    }

    public getRoleDescription(): string {
        switch (this.roleValue) {
            case UserRoles.WITHOUT_TEAM:
                return UserInformation.USER_WITHOUT_TEAM;
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
        if (this.roleValue !== UserRoles.WITHOUT_TEAM) {
            throw new Error(UserInformation.USER_WITH_TEAM);
        }

        this.setRoleValue(UserRoles.TEAM_ADMIN);
        this.setRolePermission(UserRolesDescriptions.TEAM_ADMIN_DESCRIPTION);
        this.setTeamId(teamId);
        this.setUpdatedAt(new Date());
    }

    public joinTeamAsMember(teamId: number): void {
        if (this.roleValue !== UserRoles.WITHOUT_TEAM) {
            throw new Error(UserInformation.USER_WITH_TEAM);
        }

        this.setRoleValue(UserRoles.TEAM_MEMBER);
        this.setRolePermission(UserRolesDescriptions.TEAM_MEMBER_DESCRIPTION);
        this.setTeamId(teamId);
        this.setUpdatedAt(new Date());
    }

    public leaveTeam(): void {
        if (this.roleValue === UserRoles.WITHOUT_TEAM) {
            throw new Error(UserInformation.USER_WITHOUT_TEAM);
        }

        this.setRoleValue(UserRoles.WITHOUT_TEAM);
        this.setRolePermission(UserRolesDescriptions.WITHOUT_TEAM_DESCRIPTION);
        this.setTeamId(null);
        this.setUpdatedAt(new Date());
    }

    public promoteToSystemAdmin(): void {
        if (this.roleValue !== UserRoles.SYSTEM_ADMIN) {
            throw new Error(UserInformation.USER_WITH_TEAM);
        }
        this.setRoleValue(UserRoles.SYSTEM_ADMIN);
        this.setRolePermission(UserRolesDescriptions.SYSTEM_ADMIN_DESCRIPTION);
        this.setUpdatedAt(new Date());
    }

    public async checkPassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUserName(): string {
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

    getRolePermission(): string {
        return this.rolePermission;
    }

    public getRoleValue(): number {
        return this.roleValue;
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

    public setId(id: number): void {
        this.id = id;
    }

    public setUserName(userName: string): void {
        this.userName = userName;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public async setPassword(password: string): Promise<void> {
        if(!password || password.length < 6 || password.trim() === '') {
            throw new Error(UserInformation.PASSWORD_REQUIRED);
        }

        this.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    public setCityUser(cityUser: string): void {
        this.cityUser = cityUser;
    }

    public setStateUser(stateUser: string): void {
        this.stateUser = stateUser;
    }

    public setRolePermission(rolePermission: string): void {
        this.rolePermission = rolePermission;
    }

    public setRoleValue(roleValue: number): void {
        this.roleValue = roleValue;
    }

    public setTeamId(teamId: number | null): void {
        this.teamId = teamId;
    }

    public setUpdatedAt(updatedAt: Date | null): void {
        this.updatedAt = updatedAt;
    }

    public setIsDeleted(isDeleted: number): void {
        this.isDeleted = isDeleted;
    }

    public setStripeCustomerId(stripeCustomerId: string | null): void {
        this.stripeCustomerId = stripeCustomerId;
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
    rolePermission: string;
    roleValue: number;
    teamId: number | null;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted: number;
    stripeCustomerId: string | null;
}