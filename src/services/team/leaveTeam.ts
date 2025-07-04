import { TeamInformation } from "../../enums/teamInformation";
import { UserInformation } from "../../enums/userInformation";
import { TeamModelInterface } from "../../models/teamModel";
import UserModel, { UserModelInterface } from "../../models/userModel";
import { TeamRepository } from "../../repository/teamRepository";
import { UserRepository } from "../../repository/userRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface LeaveTeamInput extends ServiceInput {
    userId: number;
    teamId: number;
}

interface LeaveTeamOutput extends ServiceOutput {
    user: UserModelInterface | null;
    message: string;
}

export class LeaveTeam implements Service {
    private static instance: LeaveTeam;
    private repository: TeamRepository;
    private userRepository: UserRepository;

    private constructor() {
        this.repository = TeamRepository.get();
        this.userRepository = UserRepository.get();
    }

    public static getInstance(): LeaveTeam {
        if (!LeaveTeam.instance) {
            LeaveTeam.instance = new LeaveTeam();
        }
        return LeaveTeam.instance;
    }

    private validateUserAndTeam(existingUser: UserModelInterface | null, existingTeam: TeamModelInterface | null): void {
        if (!existingUser) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        if (existingUser.isDeleted === 1) {
            throw new Error(UserInformation.USER_INACTIVE);
        }

        if (!existingTeam) {
            throw new Error(TeamInformation.TEAM_NOT_FOUND);
        }

        if (!existingUser.teamId || existingUser.teamId !== existingTeam.id) {
            throw new Error(UserInformation.USER_WRONG_TEAM);
        }

        if (existingTeam.isDeleted === 1) {
            throw new Error(TeamInformation.TEAM_INACTIVE);
        }
    }

    public async execute({ userId, teamId }: LeaveTeamInput): Promise<LeaveTeamOutput> {
        try {
            const existingUser = await this.userRepository.getUserById(userId);
            const existingTeam = await this.repository.getTeamById(teamId);

            if (!existingUser) {
                throw new Error(UserInformation.USER_NOT_FOUND);
            }

            if (!existingTeam) {
                throw new Error(TeamInformation.TEAM_NOT_FOUND);
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

            user.leaveTeam();
            const updatedUser = await this.userRepository.updateUser(user);

            return {
                user: updatedUser,
                message: UserInformation.USER_WITHOUT_TEAM
            };
        } catch (error) {
            throw new Error('Erro ao sair da equipe! ' + (error instanceof Error ? error.message : String(error)));
        }
    }
}
