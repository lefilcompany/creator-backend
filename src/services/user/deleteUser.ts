import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface DeleteUserInput extends ServiceInput {
    id: number;
}

interface DeleteUserOutput  extends ServiceOutput {
    message: string;
}

export class DeleteUser implements Service {
    private static instance: DeleteUser;
    private repositoruy: UserRepository;

    private constructor() {
        this.repositoruy = UserRepository.get();
    }

    public static getInstance(): DeleteUser {
        if (!DeleteUser.instance) {
            DeleteUser.instance = new DeleteUser();
        }
        return DeleteUser.instance;
    }

    public async execute({id}: DeleteUserInput): Promise<DeleteUserOutput> {
        await this.repositoruy.deleteUser(id);
        return { message: 'Usuário deletado com sucesso!' };
    }
}