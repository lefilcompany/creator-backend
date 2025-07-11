import { SolicitationInformation, SolicitationStatus } from "../../../enums/solicitationInformation";
import SolicitationModel, { SolicitationModelInterface } from "../../../models/solicitationModel";
import { SolicitationRepository } from "../../../repository/solicitationRepository";
import { Service, ServiceInput, ServiceOutput } from "../../service";

interface UpdateSolicitationToRejectedInput extends ServiceInput {
    solicitation: SolicitationModelInterface;
    adminId: number;
}

interface UpdateSolicitationToRejectedOutput extends ServiceOutput {
    solicitation: SolicitationModelInterface | null;
}

export class UpdateSolicitationToRejected implements Service {
    private static instance: UpdateSolicitationToRejected;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): UpdateSolicitationToRejected {
        if (!UpdateSolicitationToRejected.instance) {
            UpdateSolicitationToRejected.instance = new UpdateSolicitationToRejected();
        }
        return UpdateSolicitationToRejected.instance;
    }

    public async execute({ solicitation, adminId }: UpdateSolicitationToRejectedInput): Promise<UpdateSolicitationToRejectedOutput> {

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

        const updatedSolicitation = await this.repository.rejectSolicitation(solicitationObj, adminId);

        return {
            solicitation: updatedSolicitation || null
        };
    }
}
