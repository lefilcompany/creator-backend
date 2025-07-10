import { PlanInformation } from "../enums/planInformation";
import { Decimal } from "@prisma/client/runtime/library";

class PlanModel {
    private id: number | undefined;
    private name: string;
    private price: number | Decimal;
    private membersLimit: number;
    private brandsLimit: number;
    private themesLimit: number; 
    private personasLimit: number;
    private contentLimit: number;
    private planningLimit: number;
    private reviewLimit: number;
    private createdAt: Date;
    private updatedAt: Date | null;
    private isDeleted: number;

    constructor(
        id: number | undefined,
        name: string,
        price: number | Decimal,
        membersLimit: number,
        brandsLimit: number,
        themesLimit: number, 
        personasLimit: number,
        contentLimit: number,
        planningLimit: number,
        reviewLimit: number,
        updatedAt: Date | null,
        isDeleted: number | null
    ) {
        this.id = id;
        
        if (!name || name.trim() === '') {
            throw new Error(PlanInformation.NAME_REQUIRED);
        }
        this.name = name;

        if (!price || (price as number) <= 0 || (price instanceof Decimal && price.isZero())) {
            throw new Error(PlanInformation.PRICE_REQUIRED);
        }
        this.price = price;

        if (membersLimit < 0) {
            throw new Error(PlanInformation.MEMBERS_LIMIT_REQUIRED);
        }
        this.membersLimit = membersLimit;

        if (brandsLimit < 0) {
            throw new Error(PlanInformation.BRANDS_LIMIT_REQUIRED);
        }
        this.brandsLimit = brandsLimit;

        if (themesLimit < 0) {
            throw new Error(PlanInformation.THEMES_LIMIT_REQUIRED);
        }
        this.themesLimit = themesLimit;

        if (personasLimit < 0) {
            throw new Error(PlanInformation.PERSONAS_LIMIT_REQUIRED);
        }
        this.personasLimit = personasLimit;

        if (contentLimit < 0) {
            throw new Error(PlanInformation.CONTENT_LIMIT_REQUIRED);
        }
        this.contentLimit = contentLimit;

        if (planningLimit < 0) {
            throw new Error(PlanInformation.PLANNING_LIMIT_REQUIRED);
        }
        this.planningLimit = planningLimit;

        if (reviewLimit < 0) {
            throw new Error(PlanInformation.REVIEW_LIMIT_REQUIRED);
        }
        this.reviewLimit = reviewLimit;

        this.createdAt = new Date();
        this.updatedAt = updatedAt || null;
        this.isDeleted = isDeleted || 0;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number | Decimal {
        return this.price;
    }

    public getMembersLimit(): number {
        return this.membersLimit;
    }

    public getBrandsLimit(): number {
        return this.brandsLimit;
    }

    public getThemesLimit(): number {
        return this.themesLimit;
    }

    public getPersonasLimit(): number {
        return this.personasLimit;
    }

    public getContentLimit(): number {
        return this.contentLimit;
    }

    public getPlanningLimit(): number {
        return this.planningLimit;
    }

    public getReviewLimit(): number {
        return this.reviewLimit;
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
}

export default PlanModel;

export interface PlanModelInterface {
    id: number | undefined;
    name: string;
    price: number | Decimal;
    membersLimit: number;
    brandsLimit: number;
    themesLimit: number;
    personasLimit: number;
    contentLimit: number;
    planningLimit: number;
    reviewLimit: number;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted: number;
}