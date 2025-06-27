import { TeamRepository } from "../../repository/teamRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface DeleteTeamInput extends ServiceInput {
    id: number;
}

interface DeleteTeamOutput extends ServiceOutput {
    message: string;
}

export class DeleteTeam implements Service {
    private static instance: DeleteTeam;
    private repository: TeamRepository;

    private constructor() {
        this.repository = TeamRepository.get();
    }

    public static getInstance(): DeleteTeam {
        if (!DeleteTeam.instance) {
            DeleteTeam.instance = new DeleteTeam();
        }
        return DeleteTeam.instance;
    }

    public async execute({ id }: DeleteTeamInput): Promise<DeleteTeamOutput> {
        await this.repository.deleteTeam(id);
        return { message: 'Equipe deletada com sucesso!' };
    }
}