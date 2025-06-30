import { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllUsersInput extends ServiceInput {
}

interface GetAllUsersOutput extends ServiceOutput {
    allUsers: UserModelInterface[];
}

export class GetAllUsers implements Service {
    private static instance: GetAllUsers;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): GetAllUsers {
        if (!GetAllUsers.instance) {
            GetAllUsers.instance = new GetAllUsers();
        }
        return GetAllUsers.instance;
    }

    public async execute(): Promise<GetAllUsersOutput> {
        return {
            allUsers: await this.repository.getAllUsers()
        }
    }
}