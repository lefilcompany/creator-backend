import { TeamInformation } from "../enums/teamInformation";
import { TeamErros } from "../models/teamModel";
import { CreateTeam } from "../services/team/createTeam";
import { DeleteTeam } from "../services/team/deleteUser";
import { GetAllTeams } from "../services/team/getAllTeams";
import { GetAllTeamsActive } from "../services/team/getAllTeamsActive";
import { GetTeamByAcessCode } from "../services/team/getTeamByAcessCode";
import { GetTeamById } from "../services/team/getTeamsById";
import { UpdateTeam } from "../services/team/updateTeam";
import { handleError } from "../utils/errorHandler";
import { AppRoute } from "./AppRoute";

const teamRouter = new AppRoute("team");

/*
    GET: Rota para obter todos os times
    Exemplo: GET /team
*/
teamRouter.routes.get("/", async (req, res) => {
    try {
        const teamService = GetAllTeams.getInstance();
        const allTeams = await teamService.execute();
        res.status(200).send(allTeams);
    } catch (error: any) {
        handleError(error, res);
    }
});

/*
    GET: Rota para obter todos os times ativos
    Exemplo: GET /team/active
*/
teamRouter.routes.get('/active', async (req, res) => {
    try {
        const teamService = GetAllTeamsActive.getInstance();
        const activeTeams = await teamService.execute();

        res.status(200).send(activeTeams);
    } catch (error: any) {
        handleError(error, res);
    }
});

/*
    GET: Rota para obter um time específico pelo ID
    Exemplo: GET /team/1
*/
teamRouter.routes.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const teamService = GetTeamById.getInstance();
        const team = await teamService.execute({ id: Number(id) });

        if (!team) {
            throw new Error(TeamErros.TEAM_NOT_FOUND);
        }

        res.status(200).send(team);
    } catch (error) {
        handleError(error, res);
    }
});

/*
    GET: Rota para obter um time específico pelo código de acesso
    Exemplo: GET /team/accessCode123
*/
teamRouter.routes.get("/:acessCode", async (req, res) => {
    try {
        const { acessCode } = req.params;
        const teamService = GetTeamByAcessCode.getInstance();
        const team = await teamService.execute({ accessCode: String(acessCode) });

        if (!team) {
            throw new Error(TeamErros.TEAM_NOT_FOUND);
        }

        res.status(200).send(team);
    } catch (error) {
        handleError(error, res);
    }
});

/*
    POST: Rota para criar um novo time
    Exemplo: POST /team
    Body: {
        "nameTeam": "Nome do Time",
        "accessCode": "Código de Acesso"
    }
*/
teamRouter.routes.post("/", async (req, res) => {
    try {
        const nameTeam = req.body.nameTeam as string;
        const accessCode = req.body.accessCode as string;
        const userId = req.body.userId as number;

        if (!userId) {
            throw new Error(TeamInformation.USERID_INVALID);
        }

        const teamService = CreateTeam.getInstance();

        const createdTeam = await teamService.execute({
            team: {
                id: undefined,
                nameTeam,
                accessCode,
                createdAt: new Date(),
                updatedAt: null
            },
            userId
        });

        res.status(201).send(createdTeam);
    } catch (error) {
        handleError(error, res);
    }
});

/*
    PUT: Rota para atualizar um time existente
    Exemplo: PUT /team/1
    Body: {
        "nameTeam": "Novo Nome do Time",
        "accessCode": "Novo Código de Acesso"
    }
*/
teamRouter.routes.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const nameTeam = req.body.nameTeam as string;
        const accessCode = req.body.accessCode as string;

        const teamService = UpdateTeam.getInstance();

        const updatedTeam = await teamService.execute({
            team: {
                id: Number(id),
                nameTeam,
                accessCode,
                createdAt: undefined,
                updatedAt: new Date()
            }
        });

        res.status(200).send(updatedTeam);
    } catch (error) {
        handleError(error, res);
    }
});

/*
    DELETE: Rota para deletar um time
    Exemplo: DELETE /team/1
*/
teamRouter.routes.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const teamService = DeleteTeam.getInstance();
        await teamService.execute({ id: Number(id) });

        res.status(200).send({message: TeamInformation.TEAM_DELETED});
    } catch (error) {
        handleError(error, res);
    }
});

export { teamRouter };