import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreateUserInput extends ServiceInput {
    user: UserModelInterface;
}

interface CreateUserOutput extends ServiceOutput {
    user: UserModelInterface;
}

export class CreateUser implements Service {
    private static instance: CreateUser;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): CreateUser {
        if (!CreateUser.instance) {
            CreateUser.instance = new CreateUser();
        }
        return CreateUser.instance;
    }

    public async execute({user}: CreateUserInput): Promise<CreateUserOutput> {
        try {
            const userObj = new UserModel(user.id, user.userName, user.email, user.password, user.cityUser, user.stateUser, user.roleUser, user.teamId);

            const newUser = await this.repository.createUser(userObj);

            return {
                user: newUser
            };
        } catch (error) {
            if(error instanceof Error) {
                if(error.message.includes('email')) {
                    throw new Error('Email já cadastrado');
                }
            }
            throw new Error('Erro ao criar usuário! ' + error);
        }
    }
}