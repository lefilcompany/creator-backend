import { SolicitationStatus, SolicitationInformation } from "../../../enums/solicitationInformation";
import SolicitationModel, { SolicitationModelInterface } from "../../../models/solicitationModel";
import { SolicitationRepository } from "../../../repository/solicitationRepository";
import { ServiceInput, ServiceOutput, Service } from "../../service";

interface UpdateSolicitationToExpiredInput extends ServiceInput {
    solicitation: SolicitationModelInterface;
}

interface UpdateSolicitationToExpiredOutput extends ServiceOutput {
    solicitation: SolicitationModelInterface | null;
}

export class UpdateSolicitationToExpired implements Service {
    private static instance: UpdateSolicitationToExpired;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): UpdateSolicitationToExpired {
        if (!UpdateSolicitationToExpired.instance) {
            UpdateSolicitationToExpired.instance = new UpdateSolicitationToExpired();
        }
        return UpdateSolicitationToExpired.instance;
    }

    public async execute({ solicitation }: UpdateSolicitationToExpiredInput): Promise<UpdateSolicitationToExpiredOutput> {
        if (!solicitation || solicitation.status !== SolicitationStatus.PENDING) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_PENDING);
        }

        const solicitationObj = new SolicitationModel(
            solicitation.id,
            solicitation.userId,
            solicitation.teamId,
            solicitation.status,
            solicitation.updatedAt,
            solicitation.isDeleted ?? 0
        );

        const updatedSolicitation = await this.repository.expireSolicitation(solicitationObj);

        return {
            solicitation: updatedSolicitation || null
        };
    }
}
