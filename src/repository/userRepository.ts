import { PrismaClient } from "@prisma/client";
import UserModel, { UserModelInterface } from "../models/userModel";

export class UserRepository {
    private client: PrismaClient;
    private static instance: UserRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    async getAllUsers(): Promise<UserModelInterface[]> {
        const listUsers = await this.client.user.findMany();
        return listUsers;
    }

    async getAllUsersActive(): Promise<UserModelInterface[]> {
        const valido = 0;
        const usersActive = await this.client.user.findMany({
            where: {
                isDeleted: valido,
            },
        });
        return usersActive;
    }

    async getUserById(id: number): Promise<UserModelInterface | null> {
        const user = await this.client.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        return user;
    }

    async getUsersByTeamId(teamId: number): Promise<UserModelInterface[]> {
        const users = await this.client.user.findMany({
            where: {
                teamId: Number(teamId)
            },
        });
        return users;
    }

    async getUsersByTeamIdActive(teamId: number): Promise<UserModelInterface[]> {
        const users = await this.client.user.findMany({
            where: {
                teamId: Number(teamId),
                isDeleted: 0,
            },
        });
        return users;
    }

    async getUserByEmail(email: string): Promise<UserModelInterface | null> {
        if (!email) {
            throw new Error("Email não pode ser vazio ao buscar usuário.");
        }

        return await this.client.user.findUnique({
            where: { email }
        });
    }

    async createUser(user: UserModel): Promise<UserModelInterface> {
        const newUser = await this.client.user.create({
            data: {
                userName: user.getUserName(),
                email: user.getEmail(),
                password: user.getPassword(),
                cityUser: user.getCityUser(),
                stateUser: user.getStateUser(),
                rolePermission: user.getRolePermission(),
                roleValue: user.getRoleValue(),
                teamId: user.getTeamId(),
                updatedAt: user.getUpdatedAt(),
                isDeleted: user.getIsDeleted(),
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
                updatedAt: new Date(),
            }
        });
        return deletedUser;
    }
}