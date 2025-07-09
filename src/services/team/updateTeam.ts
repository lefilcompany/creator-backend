import TeamModel, { TeamModelInterface } from "../../models/teamModel";
import { TeamRepository } from "../../repository/teamRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

interface UpdateTeamInput extends ServiceInput {
    team: TeamModelInterface;
}

interface UpdateTeamOutput extends ServiceOutput {
    team: TeamModelInterface | null;
}

export class UpdateTeam implements Service {
    private static instance: UpdateTeam;
    private repository: TeamRepository;

    private constructor() {
        this.repository = TeamRepository.get();
    }

    public static getInstance(): UpdateTeam {
        if (!UpdateTeam.instance) {
            UpdateTeam.instance = new UpdateTeam();
        }
        return UpdateTeam.instance;
    }

    public async execute({ team }: UpdateTeamInput): Promise<UpdateTeamOutput> {
        const teamObj = new TeamModel(
            team.id,
            team.nameTeam,
            await bcrypt.hash(team.accessCode, SALT_ROUNDS),
            new Date(),
            team.isDeleted ?? 0
        );

        const updatedTeam = await this.repository.updateTeam(teamObj);
        return {
            team: updatedTeam
        };
    }
}