import BrandModel, { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface UpdateBrandInput extends ServiceInput {
    brand: BrandModelInterface;
}

interface UpdateBrandOutput extends ServiceOutput {
    brand: BrandModelInterface | null;
}

export class UpdateBrand implements Service {
    private static instance: UpdateBrand;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): UpdateBrand {
        if (!UpdateBrand.instance) {
            UpdateBrand.instance = new UpdateBrand();
        }
        return UpdateBrand.instance;
    }

    public async execute({ brand }: UpdateBrandInput): Promise<UpdateBrandOutput> {
        const brandObj = new BrandModel(
            brand.id,
            brand.name,
            brand.teamId,
            brand.userId,
            brand.valueProposition,
            brand.brandPillars,
            brand.brandMission,
            brand.brandInspiration,
            brand.currentObjective,
            brand.numericTarget,
            brand.restrictions,
            brand.brandHashtags,
            brand.referenceContents,
            brand.importantDates,
            brand.relevantContent,
            brand.brandCrisis,
            brand.influencersAction,
            brand.brandManual,
            new Date(),
            brand.isDeleted ?? 0
        );

        const updatedBrand = await this.repository.updateBrand(brandObj);
        return {
            brand: updatedBrand
        };
    }
}