import { PrismaClient } from "@prisma/client";
import PlanModel, { PlanModelInterface } from "../models/planModel";

export class PlanRepository {
    private client: PrismaClient;
    private static instance: PlanRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): PlanRepository {
        if (!PlanRepository.instance) {
            PlanRepository.instance = new PlanRepository();
        }
        return PlanRepository.instance;
    }

    public async getAllPlans(): Promise<PlanModelInterface[]> {
        const plans = await this.client.plan.findMany();
        return plans;
    }

    public async getAllActivePlans(): Promise<PlanModelInterface[]> {
        const activePlans = await this.client.plan.findMany({
            where: {
                isDeleted: 0,
            },
        });
        return activePlans;
    }

    public async getPlanById(id: number): Promise<PlanModelInterface | null> {
        const plan = await this.client.plan.findUnique({
            where: {
                id: Number(id),
            },
        });

        return plan 
    }

    public async createPlan(plan: PlanModel): Promise<PlanModelInterface> {
        const newPlan = await this.client.plan.create({
            data: {
                name: plan.getName(),
                price: plan.getPrice(),
                membersLimit: plan.getMembersLimit(),
                brandsLimit: plan.getBrandsLimit(),
                themesLimit: plan.getThemesLimit(),
                personasLimit: plan.getPersonasLimit(),
                contentLimit: plan.getContentLimit(),
                planningLimit: plan.getPlanningLimit(),
                reviewLimit: plan.getReviewLimit(),
            },
        });

        return newPlan;
    }

    public async updatePlan(plan: PlanModel): Promise<PlanModelInterface | null> {
        const updatedPlan = await this.client.plan.update({
            where: {
                id: Number(plan.getId()),
            },
            data: {
                name: plan.getName(),
                price: plan.getPrice(),
                membersLimit: plan.getMembersLimit(),
                brandsLimit: plan.getBrandsLimit(),
                themesLimit: plan.getThemesLimit(),
                personasLimit: plan.getPersonasLimit(),
                contentLimit: plan.getContentLimit(),
                planningLimit: plan.getPlanningLimit(),
                reviewLimit: plan.getReviewLimit(),
                updatedAt: plan.getUpdatedAt(),
                isDeleted: plan.getIsDeleted(),
            },
        });

        return updatedPlan;
    }

    public async deletePlan(id: number): Promise<PlanModelInterface | null> {
        const deletedPlan = await this.client.plan.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: 1,
            },
        });

        return deletedPlan;
    }
}