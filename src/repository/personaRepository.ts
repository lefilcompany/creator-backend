import { PrismaClient } from "@prisma/client";
import PersonaModel, { PersonaModelInterface } from "../models/personaModel";

export class PersonaRepository {
    private client: PrismaClient;
    private static instance: PersonaRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): PersonaRepository {
        if (!PersonaRepository.instance) {
            PersonaRepository.instance = new PersonaRepository();
        }
        return PersonaRepository.instance;
    }

    async getAllPersonas(): Promise<PersonaModelInterface[]> {
        const listPersonas = await this.client.persona.findMany();
        return listPersonas;
    }

    async getAllPersonasActive(): Promise<PersonaModelInterface[]> {
        const listPersonas = await this.client.persona.findMany({
            where: {
                isDeleted: 0
            }
        });
        return listPersonas;
    }

    async getPersonaById(id: number): Promise<PersonaModelInterface | null> {
        const persona = await this.client.persona.findUnique({
            where: {
                id: Number(id)
            }
        });
        return persona;
    }

    async getPersonasByBrandId(brandId: number): Promise<PersonaModelInterface[]> {
        const personas = await this.client.persona.findMany({
            where: {
                brandId: Number(brandId)
            }
        });
        return personas;
    }

    async getPersonasByTeamId(teamId: number): Promise<PersonaModelInterface[]> {
        const personas = await this.client.persona.findMany({
            where: {
                teamId: Number(teamId)
            }
        });
        return personas;
    }

    async getPersonasByName(name: string): Promise<PersonaModelInterface[]> {
        const personas = await this.client.persona.findMany({
            where: {
                name: String(name)
            }
        });
        return personas;
    }

    async getPersonasByGender(gender: string): Promise<PersonaModelInterface[]> {
        const personas = await this.client.persona.findMany({
            where: {
                gender: String(gender)
            }
        });
        return personas;
    }

    async getPersonasByAge(age: number): Promise<PersonaModelInterface[]> {
        const personas = await this.client.persona.findMany({
            where: {
                age: Number(age)
            }
        });
        return personas;
    }

    async createPersona(persona: PersonaModel): Promise<PersonaModelInterface> {
        const newPersona = await this.client.persona.create({
            data: {
                brandId: persona.getBrandId(),
                teamId: persona.getTeamId(),
                name: persona.getName(),
                gender: persona.getGender(),
                age: persona.getAge(),
                location: persona.getLocation(),
                positionDegree: persona.getPositionDegree(),
                beliefs: persona.getBeliefs(),
                contentHabit: persona.getContentHabit(),
                mainObjective: persona.getMainObjective(),
                challenge: persona.getChallenge(),
                favoriteVoice: persona.getFavoriteVoice(),
                buyJourney: persona.getBuyJourney(),
                interestTrigger: persona.getInterestTrigger(),
                isDeleted: persona.getIsDeleted()
            }
        });
        return newPersona;
    }

    async updatePersona(persona: PersonaModel): Promise<PersonaModelInterface | null> {
        const updatedPersona = await this.client.persona.update({
            where: {
                id: Number(persona.getId())
            }, data: {
                brandId: persona.getBrandId(),
                teamId: persona.getTeamId(),
                name: persona.getName(),
                gender: persona.getGender(),
                age: persona.getAge(),
                location: persona.getLocation(),
                positionDegree: persona.getPositionDegree(),
                beliefs: persona.getBeliefs(),
                contentHabit: persona.getContentHabit(),
                mainObjective: persona.getMainObjective(),
                challenge: persona.getChallenge(),
                favoriteVoice: persona.getFavoriteVoice(),
                buyJourney: persona.getBuyJourney(),
                interestTrigger: persona.getInterestTrigger(),
                updatedAt: persona.getUpdatedAt(),
                isDeleted: persona.getIsDeleted()
            }
        });
        return updatedPersona;
    }

    async deletePersona(id: number): Promise<PersonaModelInterface | null> {
        const deletedPersona = await this.client.persona.update({
            where: {
                id: Number(id)
            },
            data: {
                isDeleted: 1
            }
        });
        return deletedPersona;
    }
}