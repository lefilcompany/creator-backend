import { SolicitationInformation, SolicitationStatus } from "../../enums/solicitationInformation";
import SolicitationModel, { SolicitationModelInterface } from "../../models/solicitationModel";
import { SolicitationRepository } from "../../repository/solicitationRepository";
import { UserRepository } from "../../repository/userRepository";
import { TeamRepository } from "../../repository/teamRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";
import { UserInformation } from "../../enums/userInformation";
import { TeamInformation } from "../../enums/teamInformation";

interface CreateSolicitationInput extends ServiceInput {
    solicitation: SolicitationModelInterface;
}

interface CreateSolicitationOutput extends ServiceOutput {
    solicitation: SolicitationModelInterface;
}

export class CreateSolicitation implements Service {
    private static instance: CreateSolicitation;
    private solicitationRepository: SolicitationRepository;
    private userRepository: UserRepository;
    private teamRepository: TeamRepository;

    private constructor() {
        this.solicitationRepository = SolicitationRepository.get();
        this.userRepository = UserRepository.get();
        this.teamRepository = TeamRepository.get();
    }

    public static getInstance(): CreateSolicitation {
        if (!CreateSolicitation.instance) {
            CreateSolicitation.instance = new CreateSolicitation();
        }
        return CreateSolicitation.instance;
    }

    public async execute({ solicitation }: CreateSolicitationInput): Promise<CreateSolicitationOutput> {
        try {
            const user = await this.userRepository.getUserById(solicitation.userId);
            if (!user || user.isDeleted === 1) {
                throw new Error(UserInformation.USER_NOT_FOUND);
            }

            const team = await this.teamRepository.getTeamById(solicitation.teamId);
            if (!team || team.isDeleted === 1) {
                throw new Error(TeamInformation.TEAM_NOT_FOUND);
            }

            if (user.teamId !== null) {
                throw new Error(UserInformation.USER_ALREADY_IN_TEAM);
            }

            const existingSolicitation = await this.solicitationRepository.getSolicitationByUserId(solicitation.userId);
            if (existingSolicitation && existingSolicitation.isDeleted === 0) {
                throw new Error(SolicitationInformation.SOLICITATION_ALREADY_EXISTS);
            }

            if (existingSolicitation && existingSolicitation.isDeleted === 1) {
                const reactivatedSolicitation = await this.solicitationRepository.updateSolicitation(
                    new SolicitationModel(
                        existingSolicitation.id,
                        solicitation.userId,
                        solicitation.teamId,
                        solicitation.status,
                        new Date(),
                        0
                    )
                );

                return { solicitation: reactivatedSolicitation };
            }

            const solicitationObj = new SolicitationModel(
                solicitation.id,
                solicitation.userId,
                solicitation.teamId,
                SolicitationStatus.PENDING,
                new Date(),
                0
            );

            const newSolicitation = await this.solicitationRepository.createSolicitation(solicitationObj);

            return { 
                solicitation: newSolicitation 
            };

        } catch (error) {
            throw new Error('Erro ao criar solicitação! ' + (error instanceof Error ? error.message : String(error)));
        }
    }
}