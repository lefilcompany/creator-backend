import { TeamModelInterface } from "../../models/teamModel";
import { TeamRepository } from "../../repository/teamRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";
import bcrypt from "bcrypt";

interface GetTeamByAcessCodeInput extends ServiceInput {
    accessCode: string;
}

interface GetTeamByAcessCodeOutput extends ServiceOutput {
    team: TeamModelInterface | null;
}

export class GetTeamByAcessCode implements Service {
    private static instance: GetTeamByAcessCode;
    private repository: TeamRepository;

    private constructor() {
        this.repository = TeamRepository.get();
    }

    public static getInstance(): GetTeamByAcessCode {
        if (!GetTeamByAcessCode.instance) {
            GetTeamByAcessCode.instance = new GetTeamByAcessCode();
        }
        return GetTeamByAcessCode.instance;
    }

    public async execute({ accessCode }: GetTeamByAcessCodeInput): Promise<GetTeamByAcessCodeOutput> {
        const allTeams = await this.repository.getAllTeams();

        for (const team of allTeams) {
            const isMatch = await bcrypt.compare(accessCode, team.accessCode);
            if (isMatch) {
                return { team }; 
            }
        }

        return { team: null }; 
    }
}