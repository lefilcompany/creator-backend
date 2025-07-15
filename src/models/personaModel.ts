import { PersonaInformation } from "../enums/personaInformation";

class PersonaModel {
    private id: number | undefined;
    private brandId: number;
    private teamId: number;
    private name: string;
    private gender: string;
    private age: number;
    private location: string;
    private positionDegree: string;
    private beliefs: string;
    private contentHabit: string;
    private mainObjective: string;
    private challenge: string;
    private favoriteVoice: string;
    private buyJourney: string;
    private interestTrigger: string;
    private createdAt: Date;
    private updatedAt: Date | null
    private isDeleted: number;

    constructor(
        id: number | undefined,
        brandId: number,
        teamId: number,
        name: string,
        gender: string,
        age: number,
        location: string,
        positionDegree: string,
        beliefs: string,
        contentHabit: string,
        mainObjective: string,
        challenge: string,
        favoriteVoice: string,
        buyJourney: string,
        interestTrigger: string,
        updatedAt: Date | null,
        isDeleted: number | null
    ) {
        this.id = id;

        if(!brandId || brandId <= 0) {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_BRAND_ID);
        }
        this.brandId = brandId;

        if(!teamId || teamId <= 0) {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_TEAM_ID);
        }
        this.teamId = teamId;

        if (!name || name.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_NAME);
        }
        this.name = name;

        if (!gender || gender.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_GENDER);
        }
        this.gender = gender;

        if(!age || age <= 0) {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_AGE);
        }
        this.age = age;

        if(!location || location.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_LOCATION);
        }
        this.location = location;

        if (!positionDegree || positionDegree.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_POSITION_DEGREE);
        }
        this.positionDegree = positionDegree;

        if (!beliefs || beliefs.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_BELIEFS);
        }
        this.beliefs = beliefs;

        if (!contentHabit || contentHabit.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_CONTENT_HABIT);
        }
        this.contentHabit = contentHabit;

        if (!mainObjective || mainObjective.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_MAIN_OBJECTIVE);
        }
        this.mainObjective = mainObjective;

        if (!challenge || challenge.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_CHALLENGE);
        }
        this.challenge = challenge;

        if (!favoriteVoice || favoriteVoice.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_FAVORITE_VOICE);
        }
        this.favoriteVoice = favoriteVoice;

        if (!buyJourney || buyJourney.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_BUYJOURNEY);
        }
        this.buyJourney = buyJourney;

        if (!interestTrigger || interestTrigger.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_INTEREST_TRIGGER);
        }
        this.interestTrigger = interestTrigger;
        this.createdAt = new Date();
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted || 0;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getBrandId(): number {
        return this.brandId;
    }

    public getTeamId(): number {
        return this.teamId;
    }

    public getName(): string {
        return this.name;
    }

    public getGender(): string {
        return this.gender;
    }

    public getAge(): number {
        return this.age;
    }

    public getLocation(): string {
        return this.location;
    }

    public getPositionDegree(): string {
        return this.positionDegree;
    }

    public getBeliefs(): string {
        return this.beliefs;
    }

    public getContentHabit(): string {
        return this.contentHabit;
    }

    public getMainObjective(): string {
        return this.mainObjective;
    }

    public getChallenge(): string {
        return this.challenge;
    }

    public getFavoriteVoice(): string {
        return this.favoriteVoice;
    }

    public getBuyJourney(): string {
        return this.buyJourney;
    }

    public getInterestTrigger(): string {
        return this.interestTrigger;
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

export default PersonaModel;

export interface PersonaModelInterface {
    id: number | undefined;
    brandId: number;
    teamId: number;
    name: string;
    gender: string;
    age: number;
    location: string;
    positionDegree: string;
    beliefs: string;
    contentHabit: string;
    mainObjective: string;
    challenge: string;
    favoriteVoice: string;
    buyJourney: string;
    interestTrigger: string;
    createdAt: Date | undefined;
    updatedAt: Date | null;
    isDeleted: number;
}