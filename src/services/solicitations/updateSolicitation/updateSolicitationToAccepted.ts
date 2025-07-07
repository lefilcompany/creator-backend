import { SolicitationInformation, SolicitationStatus } from "../../../enums/solicitationInformation";
import { UserInformation } from "../../../enums/userInformation";
import SolicitationModel, { SolicitationModelInterface } from "../../../models/solicitationModel";
import UserModel, { UserModelInterface } from "../../../models/userModel";
import { SolicitationRepository } from "../../../repository/solicitationRepository";
import { UserRepository } from "../../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../../service";

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
    private userRepository: UserRepository;

    private constructor() {
        this.repository = SolicitationRepository.get();
        this.userRepository = UserRepository.get();
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
            solicitation.status,
            solicitation.updatedAt,
            solicitation.isDeleted ?? 0
        );

        const updatedSolicitation = await this.repository.acceptSolicitation(solicitationObj, adminId);

        const user = await this.userRepository.getUserById(solicitation.userId);
        if (!user) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        const userObj = new UserModel(
            user.id,
            user.userName,
            user.email,
            user.password,
            user.cityUser,
            user.stateUser,
            user.rolePermission,
            user.roleValue,
            user.teamId,
            user.updatedAt,
            user.isDeleted ?? 0,
            user.stripeCustomerId ?? null
        );

        if (!userObj.canJoinTeam()) {
            throw new Error(UserInformation.USER_ALREADY_IN_TEAM);
        }

        userObj.joinTeamAsMember(solicitation.teamId);

        const updatedUser = await this.userRepository.updateUser(userObj);

        return {
            solicitation: updatedSolicitation,
            user: updatedUser
        };
    }
}
