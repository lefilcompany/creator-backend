import { BrandInformation } from "../enums/brandInformation";

class BrandModel {
    private id: number | undefined;
    private name: string;
    private teamId: number;
    private userId: number;
    private valueProposition: string;
    private brandPillars: string;
    private brandMission: string;
    private brandInspiration: string;
    private currentObjective: string;
    private numericTarget: string;
    private restrictions: string;
    private brandHashtags: string;
    private referenceContents: string;
    private importantDates: string;
    private relevantContent: string;
    private brandCrisis: string;
    private influencersAction: number;
    private brandManual: number;
    private createdAt: Date;
    private updatedAt: Date | null;
    private isDeleted: number;

    constructor(
        id: number | undefined,
        name: string,
        teamId: number,
        userId: number,
        valueProposition: string,
        brandPillars: string,
        brandMission: string,
        brandInspiration: string,
        currentObjective: string,
        numericTarget: string,
        restrictions: string,
        brandHashtags: string,
        referenceContents: string,
        importantDates: string,
        relevantContent: string,
        brandCrisis: string,
        influencersAction: number | null,
        brandManual: number | null,
        updatedAt: Date | null,
        isDeleted: number | null
    ) {
        this.id = id;

        if(!name || name.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_BRAND_NAME);
        }
        this.name = name;

        if (!teamId) {
            throw new Error(BrandInformation.REQUIRED_TEAM_ID);
        }
        this.teamId = teamId;

        if (!userId) {
            throw new Error(BrandInformation.REQUIRED_USER_ID);
        }
        this.userId = userId;

        if (!valueProposition || valueProposition.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_VALUE_PROPOSITION);
        }
        this.valueProposition = valueProposition;

        if (!brandPillars || brandPillars.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_BRAND_PILLARS);
        }
        this.brandPillars = brandPillars;

        if (!brandMission || brandMission.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_BRAND_MISSION);
        }
        this.brandMission = brandMission;

        if (!brandInspiration || brandInspiration.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_BRAND_INSPIRATION);
        }
        this.brandInspiration = brandInspiration;

        if (!currentObjective || currentObjective.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_CURRENT_OBJECTIVE);
        }
        this.currentObjective = currentObjective;

        if (!numericTarget || numericTarget.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_NUMERIC_TARGET);
        }
        this.numericTarget = numericTarget;

        if (!restrictions || restrictions.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_RESTRICTIONS);
        }
        this.restrictions = restrictions;

        if (!brandHashtags || brandHashtags.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_BRAND_HASHTAGS);
        }
        this.brandHashtags = brandHashtags;

        if (!referenceContents || referenceContents.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_REFERENCE_CONTENTS);
        }
        this.referenceContents = referenceContents;

        if (!importantDates || importantDates.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_IMPORTANT_DATES);
        }
        this.importantDates = importantDates;

        if (!relevantContent || relevantContent.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_RELEVANT_CONTENT);
        }
        this.relevantContent = relevantContent;

        if (!brandCrisis || brandCrisis.trim() === '') {
            throw new Error(BrandInformation.REQUIRED_BRAND_CRISIS);
        }
        this.brandCrisis = brandCrisis;
        this.influencersAction = influencersAction || 0;
        this.brandManual = brandManual || 0;
        this.createdAt = new Date();
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted || 0;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getTeamId(): number {
        return this.teamId;
    }

    public getUserId(): number {
        return this.userId;
    }

    public getValueProposition(): string {
        return this.valueProposition;
    }

    public getBrandPillars(): string {
        return this.brandPillars;
    }

    public getBrandMission(): string {
        return this.brandMission;
    }

    public getBrandInspiration(): string {
        return this.brandInspiration;
    }

    public getCurrentObjective(): string {
        return this.currentObjective;
    }

    public getNumericTarget(): string {
        return this.numericTarget;
    }

    public getRestrictions(): string {
        return this.restrictions;
    }

    public getBrandHashtags(): string {
        return this.brandHashtags;
    }

    public getReferenceContents(): string {
        return this.referenceContents;
    }

    public getImportantDates(): string {
        return this.importantDates;
    }

    public getRelevantContent(): string {
        return this.relevantContent;
    }

    public getBrandCrisis(): string {
        return this.brandCrisis;
    }

    public getInfluencersAction(): number {
        return this.influencersAction;
    }

    public getBrandManual(): number {
        return this.brandManual;
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

export default BrandModel;

export interface BrandModelInterface {
    id: number | undefined;
    name: string;
    teamId: number;
    userId: number;
    valueProposition: string;
    brandPillars: string;
    brandMission: string;
    brandInspiration: string;
    currentObjective: string;
    numericTarget: string;
    restrictions: string;
    brandHashtags: string;
    referenceContents: string;
    importantDates: string;
    relevantContent: string;
    brandCrisis: string;
    influencersAction: number;
    brandManual: number;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted: number;
}