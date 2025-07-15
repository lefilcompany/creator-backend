import { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetBrandsByUserIdInput extends ServiceInput {
    userId: number;
}

interface GetBrandsByUserIdOutput extends ServiceOutput {
    brands: BrandModelInterface[];
}

export class GetBrandsByUserId implements Service {
    private static instance: GetBrandsByUserId;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): GetBrandsByUserId {
        if (!GetBrandsByUserId.instance) {
            GetBrandsByUserId.instance = new GetBrandsByUserId();
        }
        return GetBrandsByUserId.instance;
    }

    public async execute({ userId }: GetBrandsByUserIdInput): Promise<GetBrandsByUserIdOutput> {
        return {
            brands: await this.repository.getBrandsByUserId(userId)
        };
    }
}