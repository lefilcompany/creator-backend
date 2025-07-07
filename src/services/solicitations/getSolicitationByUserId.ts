import { SolicitationModelInterface } from "../../models/solicitationModel";
import { SolicitationRepository } from "../../repository/solicitationRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetSolicitationByUserIdInput extends ServiceInput {
    userId: number;
}

interface GetSolicitationByUserIdOutput extends ServiceOutput {
    solicitation: SolicitationModelInterface | null;
}

export class GetSolicitationByUserId implements Service {
    private static instace: GetSolicitationByUserId;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): GetSolicitationByUserId { 
        if (!GetSolicitationByUserId.instace) {
            GetSolicitationByUserId.instace = new GetSolicitationByUserId();
        }
        return GetSolicitationByUserId.instace;
    }

    public async execute({ userId }: GetSolicitationByUserIdInput): Promise<GetSolicitationByUserIdOutput> {
        const solicitation = await this.repository.getSolicitationByUserId(userId);
        return { solicitation };
    }
}