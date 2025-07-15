import { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface getBrandsByUserIdActiveInput extends ServiceInput {
    userId: number;
}

interface getBrandsByUserIdActiveOutput extends ServiceOutput {
    brands: BrandModelInterface[];
}

export class GetBrandsByUserIdActive implements Service {
    private static instance: GetBrandsByUserIdActive;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): GetBrandsByUserIdActive {
        if (!GetBrandsByUserIdActive.instance) {
            GetBrandsByUserIdActive.instance = new GetBrandsByUserIdActive();
        }
        return GetBrandsByUserIdActive.instance;
    }

    public async execute({ userId }: getBrandsByUserIdActiveInput): Promise<getBrandsByUserIdActiveOutput> {
        return {
            brands: await this.repository.getBrandsByUserIdActive(userId)
        };
    }
}