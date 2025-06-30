import TeamModel, { TeamModelInterface } from "../../models/teamModel";
import { TeamRepository } from "../../repository/teamRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreateTeamInput extends ServiceInput {
    team: TeamModelInterface;
}

interface CreateTeamOutput extends ServiceOutput {
    team: TeamModelInterface;
}

export class CreateTeam implements Service {
    private static instance: CreateTeam;
    private repository: TeamRepository;

    private constructor() {
        this.repository = TeamRepository.get();
    }

    public static getInstance(): CreateTeam {
        if (!CreateTeam.instance) {
            CreateTeam.instance = new CreateTeam();
        }
        return CreateTeam.instance;
    }

    public async execute({ team }: CreateTeamInput): Promise<CreateTeamOutput> {
        try {
            const existingTeam = await this.repository.getTeamByAccessCode(team.accessCode);

            if( existingTeam && existingTeam.isDeleted === 0) {
                throw new Error('Código de acesso já cadastrado');
            }

            if (existingTeam && existingTeam.isDeleted === 1) {
                const reactivatedTeam = await this.repository.updateTeam(
                    new TeamModel(
                        existingTeam.id,
                        team.nameTeam,
                        team.accessCode,
                        new Date(),
                        0
                    )
                );

                return { team: reactivatedTeam! };
            }

            const teamObj = new TeamModel(
                team.id,
                team.nameTeam,
                team.accessCode,
                new Date(),
                0
            );

            const newTeam = await this.repository.createTeam(teamObj);
            return { team: newTeam };
        } catch (error) {
            throw new Error('Erro ao criar equipe! ' + (error instanceof Error ? error.message : String(error)));
        }
    }
}