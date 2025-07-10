import { SolicitationInformation, SolicitationStatus } from "../enums/solicitationInformation";
import { validateToken } from "../middlewares/validateToken";
import { CreateSolicitation } from "../services/solicitations/createSolicitation";
import { DeleteSolicitation } from "../services/solicitations/deleteSolicitation";
import { GetAllSolicitations } from "../services/solicitations/getAllSolicitations";
import { GetSolicitationById } from "../services/solicitations/getSolicitationById";
import { GetSolicitationByUserId } from "../services/solicitations/getSolicitationByUserId";
import { GetSolicitationsByStatus } from "../services/solicitations/getSolicitationsByStatus";
import { GetSolicitationByTeamId } from "../services/solicitations/getSolicitationsByTeamId";
import { UpdateSolicitationToAccepted } from "../services/solicitations/updateSolicitation/updateSolicitationToAccepted";
import { UpdateSolicitationToCanceled } from "../services/solicitations/updateSolicitation/updateSolicitationToCanceled";
import { UpdateSolicitationToRejected } from "../services/solicitations/updateSolicitation/updateSolicitationToRejected";
import { handleError } from "../utils/errorHandler";
import { AppRoute } from "./AppRoute";

const solicitationRouter = new AppRoute("solicitation");

solicitationRouter.routes.get("/", validateToken, async (req, res) => {
    try {
        const solicitationService = GetAllSolicitations.getInstance();

        const allSolicitations = await solicitationService.execute();
        res.status(200).json(allSolicitations);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/:id", validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const solicitationService = GetSolicitationById.getInstance();
        const solicitation = await solicitationService.execute({ id: Number(id) });

        if (!solicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        res.status(200).json(solicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/user/:userId", validateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const solicitationService = GetSolicitationByUserId.getInstance();
        const userSolicitation = await solicitationService.execute({ userId: Number(userId) });
        
        if (!userSolicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        res.status(200).json(userSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/team/:teamId", validateToken, async (req, res) => {
    try {
        const { teamId } = req.params;
        const solicitationService = GetSolicitationByTeamId.getInstance();
        const teamSolicitation = await solicitationService.execute({ teamId: Number(teamId) });
        if (!teamSolicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }
        res.status(200).json(teamSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.get("/status/:status", validateToken, async (req, res) => {
    try {
        const { status } = req.params;
        const solicitationService = GetSolicitationsByStatus.getInstance();
        const solicitationsByStatus = await solicitationService.execute({ status: Number(status) });

        res.status(200).json(solicitationsByStatus);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.post("/", validateToken, async (req, res) => {
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

        res.status(201).json(newSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.put("/accept/:id", validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { adminId } = req.body;

        if (!adminId) {
            throw new Error(SolicitationInformation.INVALID_REQUEST);
        }

        const getSolicitationService = GetSolicitationById.getInstance();
        const result = await getSolicitationService.execute({ id: Number(id) });

        if (!result.solicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        const solicitationService = UpdateSolicitationToAccepted.getInstance();

        const updatedSolicitation = await solicitationService.execute({
            solicitation: {
                id: result.solicitation.id,
                userId: result.solicitation.userId,
                teamId: result.solicitation.teamId,
                status: SolicitationStatus.ACCEPTED,
                createdAt: result.solicitation.createdAt,
                updatedAt: new Date(),
                isDeleted: result.solicitation.isDeleted ?? 0,
            },
            adminId: Number(adminId)
        });

        res.status(200).json(updatedSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.put("/reject/:id", validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { adminId } = req.body;

        if (!adminId) {
            throw new Error(SolicitationInformation.INVALID_REQUEST);
        }

        const getSolicitationService = GetSolicitationById.getInstance();
        const result = await getSolicitationService.execute({ id: Number(id) });

        if (!result.solicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        const solicitationService = UpdateSolicitationToRejected.getInstance();

        const updatedSolicitation = await solicitationService.execute({
            solicitation: {
                id: result.solicitation.id,
                userId: result.solicitation.userId,
                teamId: result.solicitation.teamId,
                status: SolicitationStatus.REJECTED,
                createdAt: result.solicitation.createdAt,
                updatedAt: new Date(),
                isDeleted: result.solicitation.isDeleted ?? 0,
            },
            adminId: Number(adminId)
        });
        res.status(200).json(updatedSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.put("/canceled/:id", validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            throw new Error(SolicitationInformation.INVALID_REQUEST);
        }

        const getSolicitationService = GetSolicitationById.getInstance();
        const result = await getSolicitationService.execute({ id: Number(id) });

        if (!result.solicitation) {
            throw new Error(SolicitationInformation.SOLICITATION_NOT_FOUND);
        }

        const solicitationService = UpdateSolicitationToCanceled.getInstance();
        const updatedSolicitation = await solicitationService.execute({
            solicitation: {
                id: result.solicitation.id,
                userId: result.solicitation.userId,
                teamId: result.solicitation.teamId,
                status: SolicitationStatus.CANCELED,
                createdAt: result.solicitation.createdAt,
                updatedAt: new Date(),
                isDeleted: result.solicitation.isDeleted ?? 0,
            },
            userId: Number(userId)
        });
        res.status(200).json(updatedSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});

solicitationRouter.routes.delete("/:id", validateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const solicitationService = DeleteSolicitation.getInstance();

        const deletedSolicitation = await solicitationService.execute({ id: Number(id) });

        res.status(200).json(deletedSolicitation);
    } catch (error: any) {
        handleError(error, res);
    }
});
    
export default solicitationRouter;