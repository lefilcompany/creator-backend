import { TeamModelInterface } from "../../models/teamModel";
import { TeamRepository } from "../../repository/teamRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetTeamByIdInput extends ServiceInput {
    id: number;
}

interface GerTeamByIdOutput extends ServiceOutput {
    team: TeamModelInterface | null;
}

export class GetTeamById implements Service {
    private static instance: GetTeamById;
    private repository: TeamRepository;

    private constructor() {
        this.repository = TeamRepository.get();
    }

    public static getInstance(): GetTeamById {
        if (!GetTeamById.instance) {
            GetTeamById.instance = new GetTeamById();
        }
        return GetTeamById.instance;
    }

    public async execute({ id }: GetTeamByIdInput): Promise<GerTeamByIdOutput> {
        return {
            team: await this.repository.getTeamById(id)
        }
    }
}