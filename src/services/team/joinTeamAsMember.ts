import { TeamInformation } from "../../enums/teamInformation";
import { UserInformation } from "../../enums/userInformation";
import { TeamModelInterface } from "../../models/teamModel";
import UserModel, { UserModelInterface } from "../../models/userModel";
import { TeamRepository } from "../../repository/teamRepository";
import { UserRepository } from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface JoinTeamAsMemberInput extends ServiceInput {
    userId: number;
    teamId: number;
}

interface JoinTeamAsMemberOutput extends ServiceOutput {
    user: UserModelInterface | null;
    message: string;
}

export class JoinTeamAsMember implements Service {
    private static instance: JoinTeamAsMember;
    private repository: TeamRepository;
    private userRepository: UserRepository;

    private constructor() {
        this.repository = TeamRepository.get();
        this.userRepository = UserRepository.get();
    }

    public static getInstance(): JoinTeamAsMember {
        if (!JoinTeamAsMember.instance) {
            JoinTeamAsMember.instance = new JoinTeamAsMember();
        }
        return JoinTeamAsMember.instance;
    }

    public async execute({ userId, teamId }: JoinTeamAsMemberInput): Promise<JoinTeamAsMemberOutput> {
        try {
            const existingUser = await this.userRepository.getUserById(userId);
            const existingTeam = await this.repository.getTeamById(teamId);

            if(!existingTeam) {
                throw new Error(TeamInformation.TEAM_NOT_FOUND);
            }

            if (!existingUser) {
                throw new Error(UserInformation.USER_NOT_FOUND);
            }

            const user = new UserModel(
                existingUser.id,
                existingUser.userName,
                existingUser.email,
                existingUser.password,
                existingUser.cityUser,
                existingUser.stateUser,
                existingUser.rolePermission,
                existingUser.roleValue,
                existingUser.teamId,
                existingUser.updatedAt,
                existingUser.isDeleted,
                existingUser.stripeCustomerId
            );

            user.joinTeamAsMember(teamId);
            const updatedUser = await this.userRepository.updateUser(user);

            return {
                user: updatedUser,
                message: UserInformation.USER_JOINED_TEAM
            };
        } catch (error: any) {
            throw new Error('Erro ao tentar entrar na equipe! ' + (error instanceof Error ? error.message : String(error)));
        }
    }
}