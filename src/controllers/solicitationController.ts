import { SolicitationInformation, SolicitationStatus } from "../enums/solicitationInformation";
import { CreateSolicitation } from "../services/solicitations/createSolicitation";
import { DeleteSolicitation } from "../services/solicitations/deleteSolicitation";
import { GetAllSolicitations } from "../services/solicitations/getAllSolicitations";
import { GetSolicitationById } from "../services/solicitations/getSolicitationById";
import { GetSolicitationByUserId } from "../services/solicitations/getSolicitationByUserId";
import { GetSolicitationsByStatus } from "../services/solicitations/getSolicitationsByStatus";
import { GetSolicitationByTeamId } from "../services/solicitations/getSolicitationsByTeamId";
import { handleError } from "../utils/errorHandler";
import { AppRoute } from "./AppRoute";

const solicitationRouter = new AppRoute("solicitation");

solicitationRouter.routes.get("/", async (req, res) => {
    try {
        const solicitationService = GetAllSolicitations.getInstance();

        const allSolicitations = await solicitationService.execute();
        res.status(200).send(allSolicitations);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const solicitationService = GetSolicitationById.getInstance();
        const solicitation = await solicitationService.execute({ id: Number(id) });

        if (!solicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        res.status(200).send(solicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const solicitationService = GetSolicitationByUserId.getInstance();
        const userSolicitation = await solicitationService.execute({ userId: Number(userId) });
        
        if (!userSolicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        res.status(200).send(userSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/team/:teamId", async (req, res) => {
    try {
        const { teamId } = req.params;
        const solicitationService = GetSolicitationByTeamId.getInstance();
        const teamSolicitation = await solicitationService.execute({ teamId: Number(teamId) });
        if (!teamSolicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }
        res.status(200).send(teamSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/status/:status", async (req, res) => {
    try {
        const { status } = req.params;
        const solicitationService = GetSolicitationsByStatus.getInstance();
        const solicitationsByStatus = await solicitationService.execute({ status: Number(status) });

        res.status(200).send(solicitationsByStatus);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.post("/", async (req, res) => {
    try {
        const { userId, teamId } = req.body;
        if (!userId || !teamId) {
            throw new Error(SolicitationInformation.INVALID_REQUEST);
        }

        const solicitationService = CreateSolicitation.getInstance();

        const newSolicitation = await solicitationService.execute({
            solicitation: {
                id: undefined,
                userId: Number(userId),
                teamId: Number(teamId),
                status: SolicitationStatus.PENDING,
                createdAt: new Date(),
                updatedAt: null,
                isDeleted: 0,
            }
        });

        res.status(201).send(newSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const solicitationService = DeleteSolicitation.getInstance();

        const deletedSolicitation = await solicitationService.execute({ id: Number(id) });

        res.status(200).send(deletedSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});
    
export default solicitationRouter;