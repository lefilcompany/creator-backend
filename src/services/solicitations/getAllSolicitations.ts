import { SolicitationModelInterface } from "../../models/solicitationModel";
import { SolicitationRepository } from "../../repository/solicitationRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllSolicitationsInput extends ServiceInput {
}

interface GetAllSolicitationsOutput extends ServiceOutput {
    solicitations: SolicitationModelInterface[];
}

export class GetAllSolicitations implements Service {
    private static instance: GetAllSolicitations;
    private repostory: SolicitationRepository;

    private constructor() {
        this.repostory = SolicitationRepository.get();
    }

    public static getInstance(): GetAllSolicitations {
        if (!GetAllSolicitations.instance) {
            GetAllSolicitations.instance = new GetAllSolicitations();
        }
        return GetAllSolicitations.instance;
    }

    public async execute(): Promise<GetAllSolicitationsOutput> {
        const solicitations = await this.repostory.getAllSolicitations();
        return { solicitations };
    }
}