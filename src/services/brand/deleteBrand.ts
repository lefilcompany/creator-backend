import { BrandInformation } from "../../enums/brandInformation";
import BrandRepository from "../../repository/brandRepository";
import { ServiceInput, ServiceOutput, Service } from "../service";

interface DeleteBrandInput extends ServiceInput {
    id: number;
}

interface DeleteBrandOutput extends ServiceOutput {
    message: string;
}

export class DeleteBrand implements Service {
    private static instance: DeleteBrand;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): DeleteBrand {
        if (!DeleteBrand.instance) {
            DeleteBrand.instance = new DeleteBrand();
        }
        return DeleteBrand.instance;
    }

    public async execute({ id }: DeleteBrandInput): Promise<DeleteBrandOutput> {
        await this.repository.deleteBrand(id);
        return {
            message: BrandInformation.BRAND_DELETED
        };
    }
}