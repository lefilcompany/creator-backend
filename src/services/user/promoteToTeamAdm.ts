import { UserInformation } from "../../enums/userInformation";
import UserModel from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface PromoteToTeamAdmInput extends ServiceInput {
    userId: number;
}

interface PromoteToTeamAdmOutput extends ServiceOutput {
    message: string;
}

export class PromoteToTeamAdm implements Service {
    private static instance: PromoteToTeamAdm;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): PromoteToTeamAdm {
        if (!PromoteToTeamAdm.instance) {
            PromoteToTeamAdm.instance = new PromoteToTeamAdm();
        }
        return PromoteToTeamAdm.instance;
    }

    public async execute({ userId }: PromoteToTeamAdmInput): Promise<PromoteToTeamAdmOutput> {
        const findedUser = await this.repository.getUserById(userId);

        if (!findedUser) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        if(findedUser.isDeleted === 1) {
            throw new Error(UserInformation.USER_DELETED);
        }

        const newUser = new UserModel(
            findedUser.id,
            findedUser.userName,
            findedUser.email,
            findedUser.password,
            findedUser.cityUser,
            findedUser.stateUser,
            findedUser.roleUser,
            findedUser.teamId,
            findedUser.isDeleted,
            findedUser.stripeCustomerId
        );

        const teamId = newUser.getTeamId();
        if (!teamId) {
            throw new Error(UserInformation.USER_WITHOUT_TEAM);
        }
        newUser.promoteToAdmin(teamId)

        return {
            message: UserInformation.USER_PROMOTED_ADM,
        }
    }
}