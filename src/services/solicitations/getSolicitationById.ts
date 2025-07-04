import { SolicitationModelInterface } from "../../models/solicitationModel";
import { SolicitationRepository } from "../../repository/solicitationRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface GetSolicitationByIdInput extends ServiceInput {
    id: number;
}

interface GetSolicitationByIdOutput extends ServiceOutput {
    solicitation: SolicitationModelInterface | null;
}

export class GetSolicitationById implements Service {
    private static instance: GetSolicitationById;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): GetSolicitationById {
        if (!GetSolicitationById.instance) {
            GetSolicitationById.instance = new GetSolicitationById();
        }
        return GetSolicitationById.instance;
    }

    public async execute({ id }: GetSolicitationByIdInput): Promise<GetSolicitationByIdOutput> {
        const solicitation = await this.repository.getSolicitationById(id);
        return { 
            solicitation 
        };
    }
}