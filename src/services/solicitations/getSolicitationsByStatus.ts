import { SolicitationModelInterface } from "../../models/solicitationModel";
import { SolicitationRepository } from "../../repository/solicitationRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetSolicitationByTeamIdInput extends ServiceInput {
    status: number;
}

interface GetSolicitationByTeamIdOutput extends ServiceOutput {
    solicitations: SolicitationModelInterface[];
}

export class GetSolicitationsByStatus implements Service {
    private static instance: GetSolicitationsByStatus;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): GetSolicitationsByStatus {
        if (!GetSolicitationsByStatus.instance) {
            GetSolicitationsByStatus.instance = new GetSolicitationsByStatus();
        }
        return GetSolicitationsByStatus.instance;
    }

    public async execute({ status }: GetSolicitationByTeamIdInput): Promise<GetSolicitationByTeamIdOutput> {
        const solicitations = await this.repository.getSolicitationsByStatus(status);
        return { solicitations };
    }
}