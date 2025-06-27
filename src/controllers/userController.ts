import { GetAllUsers } from "../services/user/getAllUsers";
import { AppRoute } from "./AppRoute";
import { handleError } from "../utils/errorHandler";
import { GetUserById } from "../services/user/getUserById";
import { GetAllUsersActive } from "../services/user/getAllUsersActive";
import { GetUsersByTeamId } from "../services/user/getUsersByTeamId";
import { GetUsersByTeamIdActive } from "../services/user/getUsersByTeamIdActive";
import { CreateUser } from "../services/user/createUser";
import { UpdateUser } from "../services/user/updateUser";
import { DeleteUser } from "../services/user/deleteUser";

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
        const user = await userService.execute({idUser: Number(id)});

        if (!user) {
            throw new Error("Usuário não encontrado");
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
    Body: {
        "userName": "novoUsuario",
        "email": "exemplo@email.com",
        "password": "senhaSegura",
        "cityUser": "Cidade",
        "stateUser": "Estado",
        "roleUser": 1, // ou null
        "teamId": 1, // ou null
        "isDeleted": 0, // ou 1
        "stripeCustomerId": "cus_123456789" // ou null
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
        const roleUser = req.body.roleUser as number | null;
        const teamId = req.body.teamId as number | null;
        const stripeCustomerId = req.body.stripeCustomerId as string | null;
         
        const userService = CreateUser.getInstance();

        const newUser = await userService.execute({
            user: {
                id: undefined,
                userName,
                email,
                password,
                cityUser,
                stateUser,
                roleUser: roleUser || null,
                teamId: teamId || null,
                stripeCustomerId: stripeCustomerId || null,
                createdAt: undefined,
                updatedAt: null
            }
        });

        res.status(201).send(newUser);
    } catch (error: any) {
        handleError(error, res);
    }
});

/*
    PUT: Rota para atualizar um usuário existente
    Exemplo: PUT /user/:id
    Body: {
        "userName": "usuarioAtualizado",
        "email": "exemplo@email.com",
        "password": "novaSenhaSegura",
        "cityUser": "Nova Cidade",
        "stateUser": "Novo Estado",
        "roleUser": 2, // ou null
        "teamId": 2, // ou null
        "isDeleted": 0, // ou 1
        "stripeCustomerId": "cus_987654321" // ou null
    }
    Retorno: Usuário atualizado com sucesso
*/
userRoute.routes.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userName = req.body.userName as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
        const cityUser = req.body.cityUser as string;
        const stateUser = req.body.stateUser as string;
        const roleUser = req.body.roleUser as number | null;
        const teamId = req.body.teamId as number | null;

        const userService = UpdateUser.getInstance();
        const updatedUser = await userService.execute({
            user: {
                id: Number(id),
                userName,
                email,
                password,
                cityUser,
                stateUser,
                roleUser: roleUser || null,
                teamId: teamId || null,
                createdAt: undefined,
                updatedAt: new Date()
            }
        });

        res.status(200).send(updatedUser);
    } catch (error) {
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

        res.status(200).send({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        handleError(error, res);
    }
});

export { userRoute };