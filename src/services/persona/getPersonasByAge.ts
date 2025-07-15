import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetPersonasByAgeInput extends ServiceInput {
    age: number;
}

interface GetPersonasByAgeOutput extends ServiceOutput {
    personas: PersonaModelInterface[];
}

export class GetPersonasByAge implements Service {
    private static instance: GetPersonasByAge;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static getInstance(): GetPersonasByAge {
        if (!GetPersonasByAge.instance) {
            GetPersonasByAge.instance = new GetPersonasByAge();
        }
        return GetPersonasByAge.instance;
    }

    public async execute({ age }: GetPersonasByAgeInput): Promise<GetPersonasByAgeOutput> {
        const personas = await this.repository.getPersonasByAge(age);
        return { 
            personas: personas
        };
    }
}