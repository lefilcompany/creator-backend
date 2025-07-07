import { SolicitationInformation } from "../../enums/solicitationInformation";
import { SolicitationRepository } from "../../repository/solicitationRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface DeleteSolicitationInput extends ServiceInput {
    id: number;
}

interface DeleteSolicitationOutput extends ServiceOutput {
    message: string;
}

export class DeleteSolicitation implements Service {
    private static instance: DeleteSolicitation
    private repository: SolicitationRepository
    
    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): DeleteSolicitation {
        if (!DeleteSolicitation.instance) {
            DeleteSolicitation.instance = new DeleteSolicitation();
        }
        return DeleteSolicitation.instance;
    }

    public async execute({ id }: DeleteSolicitationInput): Promise<DeleteSolicitationOutput> {
        await this.repository.deleteSolicitation(id);
        return { message: SolicitationInformation.SOLICITATION_DELETED };
    }
}