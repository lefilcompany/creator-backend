import { SolicitationModelInterface } from "../../models/solicitationModel";
import { SolicitationRepository } from "../../repository/solicitationRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface GetSolicitationByTeamIdInput extends ServiceInput {
    teamId: number;
}

interface GetSolicitationByTeamIdOutput extends ServiceOutput {
    solicitations: SolicitationModelInterface[];
}

export class GetSolicitationByTeamId implements Service {
    private static instance: GetSolicitationByTeamId;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): GetSolicitationByTeamId {
        if (!GetSolicitationByTeamId.instance) {
            GetSolicitationByTeamId.instance = new GetSolicitationByTeamId();
        }
        return GetSolicitationByTeamId.instance;
    }

    public async execute({ teamId }: GetSolicitationByTeamIdInput): Promise<GetSolicitationByTeamIdOutput> {
        const solicitations = await this.repository.getSolicitationsByTeamId(teamId);
        return { solicitations };
    }
}