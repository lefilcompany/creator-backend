import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetPersonaByIdInput extends ServiceInput {
    id: number;
}

interface GetPersonaByIdOutput extends ServiceOutput {
    persona: PersonaModelInterface | null;
}

export class GetPersonaById implements Service {
    private static instance: GetPersonaById;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static getInstance(): GetPersonaById {
        if (!GetPersonaById.instance) {
            GetPersonaById.instance = new GetPersonaById();
        }
        return GetPersonaById.instance;
    }

    public async execute({ id }: GetPersonaByIdInput): Promise<GetPersonaByIdOutput> {
        const persona = await this.repository.getPersonaById(id);
        return { 
            persona: persona 
        };
    }
}