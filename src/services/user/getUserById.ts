import { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetUserByIdInput extends ServiceInput {
    idUser: number;
}

interface GetUserByIdOutput extends ServiceOutput {
    user: UserModelInterface | null;
}

export class GetUserById implements Service {
    private static instance: GetUserById;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): GetUserById {
        if (!GetUserById.instance) {
            GetUserById.instance = new GetUserById();
        }
        return GetUserById.instance;
    }

    public async execute({idUser}: GetUserByIdInput): Promise<GetUserByIdOutput> {
        return {
            user: await this.repository.getUserById(idUser)
        }
    }
}