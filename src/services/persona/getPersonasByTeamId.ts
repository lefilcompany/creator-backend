import { PersonaInformation } from "../../enums/personaInformation";
import { PersonaModelInterface } from "../../models/personaModel";
import { PersonaRepository } from "../../repository/personaRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetPersonasByTeamIdInput extends ServiceInput {
    teamId: number;
}

interface GetPersonasByTeamIdOutput extends ServiceOutput {
    personas: PersonaModelInterface[];
}

export class GetPersonasByTeamId implements Service {
    private static instance: GetPersonasByTeamId;
    private repository: PersonaRepository;

    private constructor() {
        this.repository = PersonaRepository.get();
    }

    public static get(): GetPersonasByTeamId {
        if (!GetPersonasByTeamId.instance) {
            GetPersonasByTeamId.instance = new GetPersonasByTeamId();
        }
        return GetPersonasByTeamId.instance;
    }

    public async execute({ teamId }: GetPersonasByTeamIdInput): Promise<GetPersonasByTeamIdOutput> {
        if (!teamId) {
            throw new Error(PersonaInformation.TEAM_ID_REQUIRED);
        }
        const personas = await this.repository.getPersonasByTeamId(teamId);
        return {
            personas: personas
        }
    }
}