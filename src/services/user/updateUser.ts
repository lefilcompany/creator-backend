import UserModel, { UserModelInterface } from "../../models/userModel";
import UserRepository from "../../repository/userRepository";
import {Service, ServiceInput, ServiceOutput} from "../service";

interface UpdateUserInput extends ServiceInput {
    user: UserModelInterface;
}

interface UpdateUserOutput extends ServiceOutput {
    user: UserModelInterface | null;
}

export class UpdateUser implements Service {
    private static instance: UpdateUser;
    private repository: UserRepository;

    private constructor() {
        this.repository = UserRepository.get();
    }

    public static getInstance(): UpdateUser {
        if (!UpdateUser.instance) {
            UpdateUser.instance = new UpdateUser();
        }
        return UpdateUser.instance;
    }

    public async execute({user}: UpdateUserInput): Promise<UpdateUserOutput> {
        const userObj = new UserModel(user.id, user.userName, user.email, user.password, user.cityUser, user.stateUser, user.roleUser, user.teamId, user.isDeleted, user.stripeCustomerId);

        const updatedUser = await this.repository.updateUser(userObj);
        return {
            user: updatedUser
        }
    }
}