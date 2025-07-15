import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllPersonasInput extends ServiceInput {
}

interface GetAllPersonasOutput extends ServiceOutput {
    personas: PersonaModelInterface[];
}

export class GetAllPersonas implements Service {
    private static instance: GetAllPersonas;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static getInstance(): GetAllPersonas {
        if (!GetAllPersonas.instance) {
            GetAllPersonas.instance = new GetAllPersonas();
        }
        return GetAllPersonas.instance;
    }

    public async execute(): Promise<GetAllPersonasOutput> {
        const personas = await this.repository.getAllPersonas();
        return {
            personas: personas
        };
    }
}