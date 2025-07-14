import { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetAllBrandsInput extends ServiceInput {
}

interface GetAllBrandsOutput extends ServiceOutput {
    brand: BrandModelInterface[];
}

export class GetAllBrands implements Service {
    private static instance: GetAllBrands;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): GetAllBrands {
        if (!GetAllBrands.instance) {
            GetAllBrands.instance = new GetAllBrands();
        }
        return GetAllBrands.instance;
    }

    public async execute(): Promise<GetAllBrandsOutput> {
        const brands = await this.repository.getAllBrands();
        return {
            brand: brands,
        };
    }
}