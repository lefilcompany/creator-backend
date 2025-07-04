import { PrismaClient } from "@prisma/client";
import TeamModel, { TeamModelInterface } from "../models/teamModel";

export class TeamRepository {
    private client: PrismaClient;
    private static instance: TeamRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): TeamRepository {
        if (!TeamRepository.instance) {
            TeamRepository.instance = new TeamRepository();
        }
        return TeamRepository.instance;
    }

    async getAllTeams(): Promise<TeamModelInterface[]> {
        const listTeams = await this.client.team.findMany();
        return listTeams;
    }

    async getAllTeamsActive(): Promise<TeamModelInterface[]> {
        const teamsActive = await this.client.team.findMany({
            where: {
                isDeleted: 0,
            },
        });
        return teamsActive;
    }

    async getTeamById(id: number): Promise<TeamModelInterface | null> {
        const team = await this.client.team.findUnique({
            where: {
                id: Number(id),
            },
        });
        return team;
    }

    async getTeamByAccessCode(accessCode: string): Promise<TeamModelInterface | null> {
        const team = await this.client.team.findUnique({
            where: {
                accessCode: accessCode,
            },
        });
        return team;
    }

    async createTeam(team: TeamModel): Promise<TeamModelInterface> {
        const newTeam = await this.client.team.create({
            data: {
                nameTeam: team.getNameTeam(),
                accessCode: team.getAccessCode(),
            },
        });
        return newTeam;
    }

    async updateTeam(team: TeamModel): Promise<TeamModelInterface | null> {
        const updatedTeam = await this.client.team.update({
            where: {
                id: team.getId(),
            },
            data: {
                nameTeam: team.getNameTeam(),
                accessCode: team.getAccessCode(),
                updatedAt: team.getUpdatedAt(),
                isDeleted: team.getIsDeleted()
            },
        });
        return updatedTeam;
    }

    async deleteTeam(id: number): Promise<TeamModelInterface | null> {
        const deletedTeam = await this.client.team.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: 1,
                updatedAt: new Date(), 
            },
        });
        return deletedTeam;
    }
}