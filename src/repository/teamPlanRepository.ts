import { PrismaClient } from "@prisma/client";
import TeamPlanModel, { TeamPlanModelInterface } from "../models/teamPlanModel";

export class TeamPlanRepository {
    private client: PrismaClient;
    private static instance: TeamPlanRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): TeamPlanRepository {
        if (!TeamPlanRepository.instance) {
            TeamPlanRepository.instance = new TeamPlanRepository();
        }
        return TeamPlanRepository.instance;
    }

    public async getAllTeamPlans(): Promise<TeamPlanModelInterface[]> {
        const plans = await this.client.teamPlan.findMany();
        return plans;
    }

    public async getAllActiveTeamPlans(): Promise<TeamPlanModelInterface[]> {
        const plans = await this.client.teamPlan.findMany({
            where: {
                isDeleted: 0,
            }
        });
        return plans;
    }

    public async getTeamPlanById(id: number): Promise<TeamPlanModelInterface | null> {
        const plan = await this.client.teamPlan.findUnique({
            where: { id }
        });
        return plan;
    }

    public async getTeamPlanByTeamId(teamId: number): Promise<TeamPlanModelInterface | null> {
        const plan = await this.client.teamPlan.findUnique({
            where: {
                teamId: teamId
            }
        })

        return plan;
    }

    public async createTeamPlan(teamPlan: TeamPlanModel): Promise<TeamPlanModelInterface> {
        const newTeamPlan = await this.client.teamPlan.create({
            data: {
                teamId: teamPlan.getTeamId(),
                planId: teamPlan.getPlanId(),
                endDate: teamPlan.getEndDate(),
                createdAt: teamPlan.getCreatedAt(),
                updatedAt: teamPlan.getUpdatedAt(),
                isDeleted: teamPlan.getIsDeleted()
            }
        });

        return newTeamPlan;
    }

    public async updateTeamPlan(teamPlan: TeamPlanModel): Promise<TeamPlanModelInterface> {
        const updatedTeamPlan = await this.client.teamPlan.update({
            where: { id: teamPlan.getId() },
            data: {
                teamId: teamPlan.getTeamId(),
                planId: teamPlan.getPlanId(),
                endDate: teamPlan.getEndDate(),
                updatedAt: new Date(),
                isDeleted: teamPlan.getIsDeleted()
            }
        });

        return updatedTeamPlan;
    }

    public async deleteTeamPlan(id: number): Promise<TeamPlanModelInterface> {
        const deletedTeamPlan = await this.client.teamPlan.update({
            where: { id },
            data: { isDeleted: 1 }
        });

        return deletedTeamPlan;
    }

    public async renewTeamPlan(id: number | undefined, newEndDate: Date): Promise<TeamPlanModelInterface> {
        const renewed = await this.client.teamPlan.update({
            where: { id },
            data: {
                endDate: newEndDate,
                updatedAt: new Date()
            }
        });

        return renewed;
    }

    public async getValidTeamPlansByTeamId(teamId: number): Promise<TeamPlanModelInterface[]> {
        const now = new Date();
        return this.client.teamPlan.findMany({
            where: {
                teamId,
                isDeleted: 0,
                endDate: {
                    gt: now
                }
            }
        });
    }
}