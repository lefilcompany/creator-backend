import { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetUsersByTeamIdActiveInput extends ServiceInput {
    teamId: number;
}

interface GetUsersByTeamIdActiveOutput extends ServiceOutput {
    usersByTeamId: UserModelInterface[];
}

export class GetUsersByTeamIdActive implements Service {
    private static instance: GetUsersByTeamIdActive;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): GetUsersByTeamIdActive {
        if (!GetUsersByTeamIdActive.instance) {
            GetUsersByTeamIdActive.instance = new GetUsersByTeamIdActive();
        }
        return GetUsersByTeamIdActive.instance;
    }

    public async execute({teamId}: GetUsersByTeamIdActiveInput): Promise<GetUsersByTeamIdActiveOutput> {
        return {
            usersByTeamId: await this.repository.getUsersByTeamIdActive(teamId)
        };
    }
}