import { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllBrandsActiveInput extends ServiceInput {
}

interface GetAllBrandsActiveOutput extends ServiceOutput {
    brand: BrandModelInterface[];
}

export class GetAllBrandsActive implements Service {
    private static instance: GetAllBrandsActive;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): GetAllBrandsActive {
        if (!GetAllBrandsActive.instance) {
            GetAllBrandsActive.instance = new GetAllBrandsActive();
        }
        return GetAllBrandsActive.instance;
    }

    public async execute(): Promise<GetAllBrandsActiveOutput> {
        const brands = await this.repository.getAllBrandsActive();
        return {
            brand: brands,
        };
    }
}