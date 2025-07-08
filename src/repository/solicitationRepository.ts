import { PrismaClient } from "@prisma/client";
import SolicitationModel, { SolicitationModelInterface } from "../models/solicitationModel";
import { SolicitationInformation, SolicitationStatus } from "../enums/solicitationInformation";
import { UserRepository } from "./userRepository";
import { UserInformation } from "../enums/userInformation";
import { UserRoles } from "../utils/userRoles";
import { addDays, isAfter } from "date-fns";

export class SolicitationRepository {
    private client: PrismaClient;
    private static instance: SolicitationRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): SolicitationRepository {
        if (!SolicitationRepository.instance) {
            SolicitationRepository.instance = new SolicitationRepository();
        }
        return SolicitationRepository.instance;
    }

    public async getAllSolicitations(): Promise<SolicitationModelInterface[]> {
        const solicitations = await this.client.solicitation.findMany();
        return solicitations;
    }

    public async getSolicitationById(id: number): Promise<SolicitationModelInterface | null> {
        const solicitation = await this.client.solicitation.findUnique({
            where: { id },
        });
        return solicitation;
    }

    public async getSolicitationByUserId(userId: number): Promise<SolicitationModelInterface | null> {
        const solicitation = await this.client.solicitation.findFirst({
            where: { userId },
        });
        return solicitation;
    }

    public async getSolicitationsByTeamId(teamId: number): Promise<SolicitationModelInterface[]> {
        const solicitations = await this.client.solicitation.findMany({
            where: { teamId },
        });

        return solicitations;
    }

    public async getSolicitationsByStatus(status: number): Promise<SolicitationModelInterface[]> {
        const solicitations = await this.client.solicitation.findMany({
            where: { status },
        });
        return solicitations;
    }

    public async createSolicitation(solicitation: SolicitationModel): Promise<SolicitationModelInterface> {
        const newSolicitation = await this.client.solicitation.create({
            data: {
                userId: solicitation.getUserId(),
                teamId: solicitation.getTeamId(),
                status: solicitation.getStatus(),
                updatedAt: solicitation.getUpdatedAt(),
                isDeleted: solicitation.getIsDeleted()
            }
        });

        return newSolicitation;
    }

    public async updateSolicitation(solicitation: SolicitationModel): Promise<SolicitationModelInterface> {
        const updatedSolicitation = await this.client.solicitation.update({
            where: { id: solicitation.getId() },
            data: {
                userId: solicitation.getUserId(),
                teamId: solicitation.getTeamId(),
                status: solicitation.getStatus(),
                updatedAt: solicitation.getUpdatedAt(),
                isDeleted: solicitation.getIsDeleted()
            }
        });
        return updatedSolicitation;
    }

    public async acceptSolicitation(solicitation: SolicitationModel, adminTeamId: number) {
        if (!solicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        // if(solicitation.getStatus() !== SolicitationStatus.PENDING) {
        //     throw new Error(SolicitationInformation.SOLICITATION_NOT_PENDING);
        // }

        const userRepository = UserRepository.get();
        const user = await userRepository.getUserById(adminTeamId);
        if (!user) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        if (solicitation.getTeamId() !== user.teamId || user.roleValue !== UserRoles.TEAM_ADMIN) {
            throw new Error(UserInformation.USER_IS_NOT_TEAM_ADMIN)
        }

        const acceptedSolicitation = await this.client.solicitation.update({
            where: { id: solicitation.getId() },
            data: {
                status: SolicitationStatus.ACCEPTED,
                updatedAt: new Date(),
            },
        });

        return acceptedSolicitation;
    }

    public async rejectSolicitation(solicitation: SolicitationModel, adminTeamId: number) {
        if (!solicitation || solicitation.getStatus() !== 0) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_PENDING);
        }

        const userRepository = UserRepository.get();
        const adminUser = await userRepository.getUserById(adminTeamId);
        if (!adminUser) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        if (solicitation.getTeamId() !== adminUser.teamId || adminUser.roleValue !== UserRoles.TEAM_ADMIN) {
            throw new Error(UserInformation.USER_IS_NOT_TEAM_ADMIN);
        }

        const rejectedSolicitation = await this.client.solicitation.update({
            where: { id: solicitation.getId() },
            data: {
                status: SolicitationStatus.REJECTED,
                updatedAt: new Date(),
            },
        });

        return rejectedSolicitation;
    }


    public async cancelSolicitation(solicitation: SolicitationModel, userId: number) {
        if (!solicitation || solicitation.getStatus() !== 0) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_PENDING);
        }

        if (solicitation.getUserId() !== userId) {
            throw new Error(SolicitationInformation.USER_IS_NOT_SOLICITATION_OWNER);
        }

        const canceledSolicitation = await this.client.solicitation.update({
            where: { id: solicitation.getId() },
            data: {
                status: SolicitationStatus.CANCELED,
                updatedAt: new Date(),
            },
        });

        return canceledSolicitation;
    }


    public async expireSolicitation(solicitation: SolicitationModel) {
        if (!solicitation || solicitation.getStatus() !== 0) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_PENDING);
        }
        const sevenDaysLater = addDays(solicitation.getCreatedAt()!, 7);
        const now = new Date();

        if (!isAfter(now, sevenDaysLater)) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_EXPIRED_YET);
        }

        const expiredSolicitation = await this.client.solicitation.update({
            where: { id: solicitation.getId() },
            data: {
                status: SolicitationStatus.EXPIRED,
                updatedAt: new Date(),
            },
        });

        return expiredSolicitation;
    }

    public async deleteSolicitation(id: number): Promise<SolicitationModelInterface | null> {
        const deletedSolicitation = await this.client.solicitation.update({
            where: { id },
            data: {
                isDeleted: 1,
                updatedAt: new Date()
            }
        });

        return deletedSolicitation;
    }
}