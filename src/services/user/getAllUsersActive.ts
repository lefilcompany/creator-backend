import { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllUsersActiveInput extends ServiceInput {
}

interface GetAllUsersActiveOutput extends ServiceOutput {
    allUsersActive: UserModelInterface[];
}

export class GetAllUsersActive implements Service {
    private static instance: GetAllUsersActive;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): GetAllUsersActive {
        if (!GetAllUsersActive.instance) {
            GetAllUsersActive.instance = new GetAllUsersActive();
        }
        return GetAllUsersActive.instance;
    }

    public async execute(): Promise<GetAllUsersActiveOutput> {
        return {
            allUsersActive: await this.repository.getAllUsersActive()
        }
    }
}