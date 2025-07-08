import { SolicitationInformation, SolicitationStatus } from "../../../enums/solicitationInformation";
import { UserInformation } from "../../../enums/userInformation";
import SolicitationModel, { SolicitationModelInterface } from "../../../models/solicitationModel";
import { UserModelInterface } from "../../../models/userModel";
import { SolicitationRepository } from "../../../repository/solicitationRepository";
import { Service, ServiceInput, ServiceOutput } from "../../service";
import { JoinTeamAsMember } from "../../team/joinTeamAsMember";

interface UpdateSolicitationToAcceptedInput extends ServiceInput {
    solicitation: SolicitationModelInterface;
    adminId: number;
}

interface UpdateSolicitationToAcceptedOutput extends ServiceOutput {
    solicitation: SolicitationModelInterface | null;
    user: UserModelInterface | null;
}

export class UpdateSolicitationToAccepted implements Service {
    private static instance: UpdateSolicitationToAccepted;
    private repository: SolicitationRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
    }

    public static getInstance(): UpdateSolicitationToAccepted {
        if (!UpdateSolicitationToAccepted.instance) {
            UpdateSolicitationToAccepted.instance = new UpdateSolicitationToAccepted();
        }
        return UpdateSolicitationToAccepted.instance;
    }

    public async execute({ solicitation, adminId }: UpdateSolicitationToAcceptedInput): Promise<UpdateSolicitationToAcceptedOutput> {
        const solicitationObj = new SolicitationModel(
            solicitation.id,
            solicitation.userId,
            solicitation.teamId,
            SolicitationStatus.ACCEPTED,
            new Date(),
            solicitation.isDeleted ?? 0
        );

        const updatedSolicitation = await this.repository.acceptSolicitation(solicitationObj, adminId);

        const joinTeamService = JoinTeamAsMember.getInstance();
        const { user } = await joinTeamService.execute({
            userId: solicitation.userId,
            teamId: solicitation.teamId
        });

        return {
            solicitation: updatedSolicitation,
            user
        };
    }
}