import { PersonaInformation } from "../../enums/personaInformation";
import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetPersonasByBrandIdInput extends ServiceInput {
    brandId: number;
}

interface GetPersonasByBrandIdOutput extends ServiceOutput {
    personas: PersonaModelInterface[];
}

export class GetPersonasByBrandId implements Service {
    private static instance: GetPersonasByBrandId;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static getInstance(): GetPersonasByBrandId {
        if (!GetPersonasByBrandId.instance) {
            GetPersonasByBrandId.instance = new GetPersonasByBrandId();
        }
        return GetPersonasByBrandId.instance;
    }

    public async execute({ brandId }: GetPersonasByBrandIdInput): Promise<GetPersonasByBrandIdOutput> {
        if (!brandId) {
            throw new Error(PersonaInformation.BRAND_ID_REQUIRED);
        }
        
        const personas = await this.repository.getPersonasByBrandId(brandId);
        return { 
            personas: personas 
        };
    }
}