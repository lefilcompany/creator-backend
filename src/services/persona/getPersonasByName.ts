import { PersonaInformation } from "../../enums/personaInformation";
import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetPersonasByNameInput extends ServiceInput {
    name: string;
}

interface GetPersonasByNameOutput extends ServiceOutput {
    personas: PersonaModelInterface[];
}

export class GetPersonasByName implements Service {
    private static instance: GetPersonasByName;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static getInstance(): GetPersonasByName {
        if (!GetPersonasByName.instance) {
            GetPersonasByName.instance = new GetPersonasByName();
        }
        return GetPersonasByName.instance;
    }

    public async execute({ name }: GetPersonasByNameInput): Promise<GetPersonasByNameOutput> {
        if (!name || name.trim() === "") {
            throw new Error(PersonaInformation.PERSONA_REQUIRED_NAME);
        }

        const personaName = name.trim().toLowerCase();

        const personas = await this.repository.getPersonasByName(String(personaName));

        return {
            personas: personas
        }
    }
}