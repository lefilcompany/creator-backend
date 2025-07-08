import { UserInformation } from "../enums/userInformation";
import { UserRepository } from "../repository/userRepository";
import { CreateUser } from "../services/user/createUser";
import { DeleteUser } from "../services/user/deleteUser";
import { GetAllUsers } from "../services/user/getAllUsers";
import { GetAllUsersActive } from "../services/user/getAllUsersActive";
import { GetUserById } from "../services/user/getUserById";
import { GetUsersByTeamId } from "../services/user/getUsersByTeamId";
import { GetUsersByTeamIdActive } from "../services/user/getUsersByTeamIdActive";
import { UpdateUser } from "../services/user/updateUser";
import { handleError } from "../utils/errorHandler";
import { UserRolesDescriptions, UserRoles } from "../utils/userRoles";
import { AppRoute } from "./AppRoute";

const userRoute = new AppRoute("user");

/*
    GET: Rota para obter todos os usuários
    Exemplo: GET /user
*/
userRoute.routes.get("/", async (req, res) => {
    try {
        const userService = GetAllUsers.getInstance();
        const allUsers = await userService.execute();
        res.status(200).send(allUsers);
    } catch (error: any) {
        handleError(error, res);
    }
});

/* 
    GET: Rota para obter todos os usuários ativos
    Exemplo: GET /user/active
*/
userRoute.routes.get('/active', async (req, res) => {
    try {
        const userService = GetAllUsersActive.getInstance();
        const activeUsers = await userService.execute();

        res.status(200).send(activeUsers);
    } catch (error: any) {
        handleError(error, res);
    }
});

/*
    GET: Rota para obter um usuário específico pelo ID
    Exemplo: GET /user/1
*/
userRoute.routes.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userService = GetUserById.getInstance();
        const user = await userService.execute({ id: Number(id) });

        if (!user) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        res.status(200).send(user);
    } catch (error) {
        handleError(error, res);
    }
});

/*
    GET: Rota para obter usuários por ID da equipe
    Exemplo: GET /user/team/:teamId
*/
//Ver se faz sentido isso aqui
userRoute.routes.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const userService = GetUsersByTeamId.getInstance();
        const usersByTeam = await userService.execute({ teamId: Number(teamId) });

        res.status(200).send(usersByTeam);
    } catch (error) {
        handleError(error, res);
    }
});

/*
    Get: Rota para obter usuários ativos por ID da equipe
    Exemplo: GET /user/team/:teamId/active
*/
//Ver se faz sentido isso aqui
userRoute.routes.get('/team/:teamId/active', async (req, res) => {
    try {
        const { teamId } = req.params;
        const userService = GetUsersByTeamIdActive.getInstance();
        const activeUsersByTeam = await userService.execute({ teamId: Number(teamId) });

        res.status(200).send(activeUsersByTeam);
    } catch (error) {
        handleError(error, res);
    }
});

/*
    POST: Rota para criar um novo usuário
    Exemplo: POST /user
    Body (JSON):
    {
        "userName": "João Silva",
        "email": "joao@email.com",
        "password": "123456",
        "cityUser": "São Paulo",
        "stateUser": "SP",
        "rolePermission": "TEAM_ADMIN_DESCRIPTION", // Opcional
        "roleValue": 2, // Opcional
        "teamId": 1, // Opcional
        "stripeCustomerId": "stripe_123" // Opcional
    }
    Retorno: Usuário criado com sucesso
*/
userRoute.routes.post("/", async (req, res) => {
    try {
        const userName = req.body.userName as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
        const cityUser = req.body.cityUser as string;
        const stateUser = req.body.stateUser as string;
        const rolePermission = req.body.rolePermission as string | undefined;
        const roleValue = req.body.roleValue as number | undefined;
        const teamId = req.body.teamId as number | undefined;
        const stripeCustomerId = req.body.stripeCustomerId as string | undefined;

        const userService = CreateUser.getInstance();

        const newUser = await userService.execute({
            user: {
                id: undefined,
                userName,
                email,
                password,
                cityUser,
                stateUser,
                rolePermission: rolePermission || UserRolesDescriptions.WITHOUT_TEAM_DESCRIPTION,
                roleValue: roleValue || UserRoles.WITHOUT_TEAM,
                teamId: teamId || null,
                createdAt: undefined, // Será definido no UserModel
                updatedAt: null, // Será definido no UserModel
                isDeleted: 0, // Será definido no UserModel
                stripeCustomerId: stripeCustomerId || null
            }
        });

        res.status(201).send(newUser);
    } catch (error: any) {
        handleError(error, res);
    }
});

/*
    PUT: Rota para atualizar um usuário existente
    Exemplo: PUT /user/1
    Body (JSON):
    {
        "userName": "João Silva Atualizado",
        "email": "joao.novo@email.com",
        "password": "novaSenha123",
        "cityUser": "Rio de Janeiro",
        "stateUser": "RJ",
        "rolePermission": "TEAM_MEMBER_DESCRIPTION", // Opcional
        "roleValue": 3, // Opcional
        "teamId": 2, // Opcional
        "isDeleted": 0, // Opcional
        "stripeCustomerId": "stripe_456" // Opcional
    }
    Retorno: Usuário atualizado com sucesso
*/
userRoute.routes.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const userRepository = UserRepository.get();
        const existingUser = await userRepository.getUserById(Number(id));

        if (!existingUser) {
            throw new Error(UserInformation.USER_NOT_FOUND);
        }

        const {
            userName,
            email,
            password,
            cityUser,
            stateUser,
            rolePermission,
            roleValue,
            teamId,
            isDeleted,
            stripeCustomerId
        } = req.body;

        const userService = UpdateUser.getInstance();

        const updatedUser = await userService.execute({
            user: {
                id: Number(id),
                userName: userName ?? existingUser.userName,
                email: email ?? existingUser.email,
                password: password ?? existingUser.password,
                cityUser: cityUser ?? existingUser.cityUser,
                stateUser: stateUser ?? existingUser.stateUser,
                rolePermission: rolePermission ?? existingUser.rolePermission,
                roleValue: roleValue ?? existingUser.roleValue,
                teamId: teamId ?? existingUser.teamId,
                createdAt: existingUser.createdAt,
                updatedAt: new Date(),
                isDeleted: isDeleted ?? existingUser.isDeleted,
                stripeCustomerId: stripeCustomerId ?? existingUser.stripeCustomerId
            }
        });

        res.status(200).send(updatedUser);
    } catch (error: any) {
        handleError(error, res);
    }
});

/*
    DELETE: Rota para excluir um usuário
    Exemplo: DELETE /user/:id
    Retorno: Usuário excluído com sucesso
*/
userRoute.routes.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userService = DeleteUser.getInstance();
        await userService.execute({ id: Number(id) });

        res.status(200).send({ message: UserInformation.USER_DELETED });
    } catch (error) {
        handleError(error, res);
    }
});

export default userRoute;