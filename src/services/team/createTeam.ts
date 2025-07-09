import { TeamInformation } from "../../enums/teamInformation";
import { UserInformation } from "../../enums/userInformation";
import TeamModel, { TeamModelInterface } from "../../models/teamModel";
import UserModel, { UserModelInterface } from "../../models/userModel";
import { TeamRepository } from "../../repository/teamRepository";
import { UserRepository } from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

interface CreateTeamInput extends ServiceInput {
    team: TeamModelInterface;
    userId: number;
}

interface CreateTeamOutput extends ServiceOutput {
    team: TeamModelInterface;
    user: UserModelInterface | null;
}

export class CreateTeam implements Service {
    private static instance: CreateTeam;
    private repository: TeamRepository;
    private userRepository: UserRepository;

    private constructor() {
        this.repository = TeamRepository.get();
        this.userRepository = UserRepository.get();
    }

    public static getInstance(): CreateTeam {
        if (!CreateTeam.instance) {
            CreateTeam.instance = new CreateTeam();
        }
        return CreateTeam.instance;
    }

    public async execute({ team, userId }: CreateTeamInput): Promise<CreateTeamOutput> {
        try {
            const userFounded = await this.userRepository.getUserById(userId);

            if (!userFounded) {
                throw new Error(UserInformation.USER_NOT_FOUND);
            }

            const user = new UserModel(
                userFounded.id,
                userFounded.userName,
                userFounded.email,
                userFounded.password,
                userFounded.cityUser,
                userFounded.stateUser,
                userFounded.rolePermission,
                userFounded.roleValue,
                userFounded.teamId,
                userFounded.updatedAt,
                userFounded.isDeleted,
                userFounded.stripeCustomerId
            )

            const existingTeam = await this.repository.getTeamByAccessCode(team.accessCode);

            if (existingTeam && existingTeam.isDeleted === 0) {
                throw new Error(TeamInformation.TEAM_ALREADY_EXISTS);
            }

            let createdTeam;

            if (existingTeam && existingTeam.isDeleted === 1) {
                const reactivatedTeam = await this.repository.updateTeam(
                    new TeamModel(
                        existingTeam.id,
                        team.nameTeam,
                        await bcrypt.hash(team.accessCode, SALT_ROUNDS),
                        new Date(),
                        0
                    )
                );

                createdTeam = reactivatedTeam!;
            }

            const teamObj = new TeamModel(
                team.id,
                team.nameTeam,
                await bcrypt.hash(team.accessCode, SALT_ROUNDS),
                new Date(),
                0
            );

            createdTeam = await this.repository.createTeam(teamObj);

            if (!user.canCreateTeam()) {
                throw new Error(UserInformation.USER_WITH_TEAM)
            }
            user.promoteToAdmin(createdTeam.id!);

            const updatedUser = await this.userRepository.updateUser(user);

            return {
                team: createdTeam,
                user: updatedUser || null
            }
        } catch (error) {
            throw new Error('Erro ao criar equipe! ' + (error instanceof Error ? error.message : String(error)));
        }
    }
}