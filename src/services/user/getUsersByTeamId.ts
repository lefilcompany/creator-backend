import { UserModelInterface } from "../../models/userModel";
import { UserRepository } from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetUsersByTeamIdInput extends ServiceInput {
    teamId: number;
}

interface GetUsersByTeamIdOutput extends ServiceOutput {
    usersByTeamId: UserModelInterface[];
}

export class GetUsersByTeamId implements Service {
    private static instance: GetUsersByTeamId;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): GetUsersByTeamId {
        if (!GetUsersByTeamId.instance) {
            GetUsersByTeamId.instance = new GetUsersByTeamId();
        }
        return GetUsersByTeamId.instance;
    }

    public async execute({teamId}: GetUsersByTeamIdInput): Promise<GetUsersByTeamIdOutput> {
        return {
            usersByTeamId: await this.repository.getUsersByTeamId(teamId)
        };
    }
}