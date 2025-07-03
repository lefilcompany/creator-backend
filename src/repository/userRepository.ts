import { PrismaClient } from "@prisma/client";
import UserModel, { UserModelInterface } from "../models/userModel";

export class UserRepostitory {
    private client: PrismaClient;
    private static instance: UserRepostitory;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static getInstance(): UserRepostitory {
        if (!UserRepostitory.instance) {
            UserRepostitory.instance = new UserRepostitory();
        }
        return UserRepostitory.instance;
    }

    public async getAllUsers(): Promise<UserModelInterface[]> {
        const users = await this.client.user.findMany();
        return users;
    }

    public async getUserById(id: number): Promise<UserModelInterface | null> {
        const user = await this.client.user.findUnique({
            where: { id },
        });
        return user;
    }

    async createUser(user: UserModel): Promise<UserModelInterface> {
        const newUser = await this.client.user.create({
            data: {
                userName: user.getUserName(),
                email: user.getEmail(),
                password: user.getPassword(),
                cityUser: user.getCityUser(),
                stateUser: user.getStateUser()
            }
        });
        return newUser;
    }

    async updateUser(user: UserModel): Promise<UserModelInterface | null> {
        const updatedUser = await this.client.user.update({
            where: {
                id: user.getId(),
            },
            data: {
                userName: user.getUserName(),
                email: user.getEmail(),
                password: user.getPassword(),
                cityUser: user.getCityUser(),
                stateUser: user.getStateUser(),
                rolePermission: user.getRolePermission(),
                roleValue: user.getRoleValue(),
                teamId: user.getTeamId(),
                isDeleted: user.getIsDeleted(),
                stripeCustomerId: user.getStripeCustomerId(),
                updatedAt: user.getUpdatedAt()
            }
        });
        return updatedUser;
    }

    async deleteUser(id: number): Promise<UserModelInterface | null> {
        const deletedUser = await this.client.user.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: 1,
            }
        });
        return deletedUser;
    }
}