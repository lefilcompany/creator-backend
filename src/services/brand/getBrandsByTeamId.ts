import { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetBrandByTeamIdInput extends ServiceInput {
    teamId: number;
}

interface GetBrandByTeamIdOutput extends ServiceOutput {
    brands: BrandModelInterface[];
}

export class GetBrandsByTeamId implements Service {
    private static instance: GetBrandsByTeamId;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): GetBrandsByTeamId {
        if (!GetBrandsByTeamId.instance) {
            GetBrandsByTeamId.instance = new GetBrandsByTeamId();
        }
        return GetBrandsByTeamId.instance;
    }

    public async execute({ teamId }: GetBrandByTeamIdInput): Promise<GetBrandByTeamIdOutput> {
        return {
            brands: await this.repository.getBrandsByTeamId(teamId)
        };
    }
}