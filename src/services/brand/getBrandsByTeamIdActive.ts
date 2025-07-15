import { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetBrandByTeamIdActiveInput extends ServiceInput {
    teamId: number;
}

interface GetBrandByTeamIdActiveOutput extends ServiceOutput {
    brands: BrandModelInterface[];
}

export class GetBrandsByTeamIdActive implements Service {
    private static instance: GetBrandsByTeamIdActive;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): GetBrandsByTeamIdActive {
        if (!GetBrandsByTeamIdActive.instance) {
            GetBrandsByTeamIdActive.instance = new GetBrandsByTeamIdActive();
        }
        return GetBrandsByTeamIdActive.instance;
    }

    public async execute({ teamId }: GetBrandByTeamIdActiveInput): Promise<GetBrandByTeamIdActiveOutput> {
        return {
            brands: await this.repository.getBrandsByTeamIdActive(teamId)
        };
    }
}