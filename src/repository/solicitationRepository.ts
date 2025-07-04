import { PrismaClient } from "@prisma/client";
import SolicitationModel, { SolicitationModelInterface } from "../models/solicitationModel";

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

    public async createSolicitation(solicitation: SolicitationModel) : Promise<SolicitationModelInterface> {
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
            where: { 
                id: solicitation.getId()
            },
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