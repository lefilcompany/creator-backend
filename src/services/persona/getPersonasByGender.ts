import { PersonaInformation } from "../../enums/personaInformation";
import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetPersonasByGenderInput extends ServiceInput {
    gender: string;
}

interface GetPersonasByGenderOutput extends ServiceOutput {
    personas: PersonaModelInterface[];
}

export class GetPersonasByGender implements Service {
    private static instance: GetPersonasByGender;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static getInstance(): GetPersonasByGender {
        if (!GetPersonasByGender.instance) {
            GetPersonasByGender.instance = new GetPersonasByGender();
        }
        return GetPersonasByGender.instance
    }

    public async execute({ gender }: GetPersonasByGenderInput): Promise<GetPersonasByGenderOutput> {
        if(!gender) {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_GENDER);
        }

        const personaGender = gender.trim().toLowerCase();

        const personas = await this.repository.getPersonasByGender(String(personaGender));
        return {
            personas: personas
        }
    }
}