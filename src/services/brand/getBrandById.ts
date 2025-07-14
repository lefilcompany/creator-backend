import { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface GetBrandByIdInput extends ServiceInput {
    id: number;
}

interface GetBrandByIdOutput extends ServiceOutput {
    brand: BrandModelInterface | null;
}

export class GetBrandById implements Service {
    private static instance: GetBrandById;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }   

    public static getInstance(): GetBrandById {
        if (!GetBrandById.instance) {
            GetBrandById.instance = new GetBrandById();
        }
        return GetBrandById.instance;
    }

    public async execute({ id }: GetBrandByIdInput): Promise<GetBrandByIdOutput> {
        return {
            brand: await this.repository.getBrandById(id)
        };
    }
}