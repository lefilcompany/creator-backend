import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllPersonasActiveInput extends ServiceInput {
}

interface GetAllPersonasActiveOutput extends ServiceOutput {
    personas: PersonaModelInterface[];
}

export class GetAllPersonasActive implements Service {
    private static instance: GetAllPersonasActive;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static getInstance(): GetAllPersonasActive {
        if (!GetAllPersonasActive.instance) {
            GetAllPersonasActive.instance = new GetAllPersonasActive();
        }
        return GetAllPersonasActive.instance;
    }

    public async execute(): Promise<GetAllPersonasActiveOutput> {
        const personas = await this.repository.getAllPersonasActive();
        return {
            personas: personas
        };
    }
}