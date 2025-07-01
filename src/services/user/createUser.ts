import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import { UserRoles } from "../../utils/userRoles";
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

    public async execute({ user }: CreateUserInput): Promise<CreateUserOutput> {
        try {
            const existingUser = await this.repository.getUserByEmail(user.email);

            // Se já existe e está ativo -> erro
            if (existingUser && existingUser.isDeleted === 0) {
                throw new Error('Email já cadastrado');
            }

            // Se já existe e está inativo -> reativa
            if (existingUser && existingUser.isDeleted === 1) {
                const reactivatedUser = await this.repository.updateUser(
                    new UserModel(
                        existingUser.id,
                        user.userName,
                        user.email,
                        user.password,
                        user.cityUser,
                        user.stateUser,
                        user.roleUser,
                        user.teamId,
                        0,
                        user.stripeCustomerId ?? null,
                        new Date()
                    )
                );

                return { user: reactivatedUser! };
            }

            // Se não existe, cria novo usuário
            const userObj = new UserModel(
                user.id,
                user.userName,
                user.email,
                user.password,
                user.cityUser,
                user.stateUser,
                UserRoles.NEW_USER,
                user.teamId,
                0,
                user.stripeCustomerId ?? null
            );

            const newUser = await this.repository.createUser(userObj);

            return { user: newUser };

        } catch (error) {
            throw new Error('Erro ao criar usuário! ' + (error instanceof Error ? error.message : String(error)));
        }
    }
}