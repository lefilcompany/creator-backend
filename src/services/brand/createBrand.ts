import { BrandInformation } from "../../enums/brandInformation";
import BrandModel, { BrandModelInterface } from "../../models/brandModel";
import BrandRepository from "../../repository/brandRepository";
import { Service, ServiceInput, ServiceOutput } from "../service";

interface CreateBrandInput extends ServiceInput {
    brand: BrandModelInterface;
}

interface CreateBrandOutput extends ServiceOutput {
    brand: BrandModelInterface;
}

export class CreateBrand implements Service {
    private static instance: CreateBrand;
    private repository: BrandRepository;

    private constructor() {
        this.repository = BrandRepository.get();
    }

    public static getInstance(): CreateBrand {
        if (!CreateBrand.instance) {
            CreateBrand.instance = new CreateBrand();
        }
        return CreateBrand.instance;
    }

    public async execute({ brand }: CreateBrandInput): Promise<CreateBrandOutput> {
        try {
            const existingBrand = await this.repository.getBrandByName(brand.name);

            if (existingBrand && existingBrand.isDeleted === 0) {
                throw new Error(BrandInformation.BRAND_ALREADY_EXISTS);
            }

            if (existingBrand && existingBrand.isDeleted === 1) {
                const reactiveBrand = await this.repository.updateBrand(
                    new BrandModel(
                        existingBrand.id,
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
                        0
                    )
                );
                return {
                    brand: reactiveBrand!
                };
            }

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
                brand.updatedAt,
                0
            );

            const newBrand = await this.repository.createBrand(brandObj);

            return {
                brand: newBrand
            };
        } catch (error: any) {
            throw new Error(BrandInformation.BRAND_ERROR_CREATE + (error instanceof Error ? error.message : String(error)));
        }
    }
}