import { TeamModelInterface } from "../../models/teamModel";
import { TeamRepository } from "../../repository/teamRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllTeamsInput extends ServiceInput {
}

interface GetAllTeamsOutput extends ServiceOutput {
    allTeams: TeamModelInterface[];
}

export class GetAllTeams implements Service {
    private static instance: GetAllTeams;
    private repository: TeamRepository;

    private constructor() {
        this.repository = TeamRepository.get();
    }

    public static getInstance(): GetAllTeams {
        if (!GetAllTeams.instance) {
            GetAllTeams.instance = new GetAllTeams();
        }
        return GetAllTeams.instance;
    }

    public async execute(): Promise<GetAllTeamsOutput> {
        return {
            allTeams: await this.repository.getAllTeams()
        };
    }
}