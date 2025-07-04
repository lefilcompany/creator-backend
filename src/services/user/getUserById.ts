import { UserModelInterface } from "../../models/userModel";
import { UserRepository } from "../../repository/userRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface GetUserByIdInput extends ServiceInput {
    id: number;
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

    public async execute({ id }: GetUserByIdInput): Promise<GetUserByIdOutput> {
        const user = await this.repository.getUserById(id);
        return {
            user: user
        };
    }
}