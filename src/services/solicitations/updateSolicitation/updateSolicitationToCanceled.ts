import { SolicitationStatus, SolicitationInformation } from "../../../enums/solicitationInformation";
import SolicitationModel, { SolicitationModelInterface } from "../../../models/solicitationModel";
import { SolicitationRepository } from "../../../repository/solicitationRepository";
import { ServiceInput, ServiceOutput, Service } from "../../service";

interface UpdateSolicitationToCanceledInput extends ServiceInput {
    solicitation: SolicitationModelInterface;
    userId: number;
}

interface UpdateSolicitationToCanceledOutput extends ServiceOutput {
    solicitation: SolicitationModelInterface | null;
}

export class UpdateSolicitationToCanceled implements Service {
    private static instance: UpdateSolicitationToCanceled;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): UpdateSolicitationToCanceled {
        if (!UpdateSolicitationToCanceled.instance) {
            UpdateSolicitationToCanceled.instance = new UpdateSolicitationToCanceled();
        }
        return UpdateSolicitationToCanceled.instance;
    }

    public async execute({ solicitation, userId }: UpdateSolicitationToCanceledInput): Promise<UpdateSolicitationToCanceledOutput> {
        if (!solicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        const solicitationObj = new SolicitationModel(
            solicitation.id,
            solicitation.userId,
            solicitation.teamId,
            solicitation.status,
            solicitation.updatedAt,
            solicitation.isDeleted ?? 0
        );

        const updatedSolicitation = await this.repository.cancelSolicitation(solicitationObj, userId);

        return {
            solicitation: updatedSolicitation || null
        };
    }
}
