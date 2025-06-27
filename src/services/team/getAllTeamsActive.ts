import { TeamModelInterface } from "../../models/teamModel";
import { TeamRepository } from "../../repository/teamRepository";
import { ServiceInput, Service, ServiceOutput } from "../service";

interface GetAllTeamsActiveInput extends ServiceInput {
}

interface GetAllTeamsActiveOutput extends ServiceOutput {
    allTeamsActive: TeamModelInterface[];
}

export class GetAllTeamsActive implements Service {
    private static instance: GetAllTeamsActive;
    private repository: TeamRepository;

    private constructor() {
        this.repository = TeamRepository.get();
    }

    public static getInstance(): GetAllTeamsActive {
        if (!GetAllTeamsActive.instance) {
            GetAllTeamsActive.instance = new GetAllTeamsActive();
        }
        return GetAllTeamsActive.instance;
    }

    public async execute(): Promise<GetAllTeamsActiveOutput> {
        return {
            allTeamsActive: await this.repository.getAllTeamsActive()
        };
    }
}