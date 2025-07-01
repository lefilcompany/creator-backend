import { UserInformation } from "../../enums/userInformation";
import UserModel from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput } from "../service";

interface JoinToTeamInput extends ServiceInput {
    userId: number;
    teamId: number;
}

interface JoinToTeamOutput extends ServiceInput {
    message: string;
}

export class JoinToTeam implements Service {
    private static instance : JoinToTeam;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): JoinToTeam {
        if (!JoinToTeam.instance) {
            JoinToTeam.instance = new JoinToTeam();
        }
        return JoinToTeam.instance;
    }

    public async execute({ userId, teamId }: JoinToTeamInput): Promise<JoinToTeamOutput> {
        const findedUser = await this.repository.getUserById(userId);

        if (!findedUser) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        if( findedUser.isDeleted === 1 ) {
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
        
        newUser.joinTeamAsMember(teamId);

        return {
            message: UserInformation.USER_JOINED_TEAM
        }
    }
}
