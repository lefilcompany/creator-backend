import { PrismaClient } from "@prisma/client";
import BrandModel, { BrandModelInterface } from "../models/brandModel";

class BrandRepository {
    private client: PrismaClient;
    private static instance: BrandRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): BrandRepository {
        if (!BrandRepository.instance) {
            BrandRepository.instance = new BrandRepository();
        }
        return BrandRepository.instance;
    }

    async getAllBrands(): Promise<BrandModelInterface[]> {
        const listBrands = await this.client.brand.findMany();
        return listBrands;
    }

    async getAllBrandsActive(): Promise<BrandModelInterface[]> {
        const isDeleted = 0;
        const brandsActive = await this.client.brand.findMany({
            where: {
                isDeleted: isDeleted,
            },
        });
        return brandsActive;
    }

    async getBrandById(id: number): Promise<BrandModelInterface | null> {
        const brand = await this.client.brand.findUnique({
            where: {
                id: Number(id),
            },
        });
        return brand;
    }

    async getBrandsByTeamId(teamId: number): Promise<BrandModelInterface[]> {
        const brands = await this.client.brand.findMany({
            where: {
                teamId: Number(teamId)
            },
        });
        return brands;
    }

    async getBrandsByTeamIdActive(teamId: number): Promise<BrandModelInterface[]> {
        const brands = await this.client.brand.findMany({
            where: {
                teamId: Number(teamId),
                isDeleted: 0,
            },
        });
        return brands;
    }

    async getBrandsByUserId(userId: number): Promise<BrandModelInterface[]> {
        const brands = await this.client.brand.findMany({
            where: {
                userId: Number(userId)
            },
        });
        return brands;
    }

    async getBrandsByUserIdActive(userId: number): Promise<BrandModelInterface[]> {
        const brands = await this.client.brand.findMany({
            where: {
                userId: Number(userId),
                isDeleted: 0,
            },
        });
        return brands;
    }

    async getBrandByName(name: string): Promise<BrandModelInterface | null> {
        const brand = await this.client.brand.findFirst({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
                isDeleted: 0,
            },
        });

        return brand;
    }

    async createBrand(brand: BrandModel): Promise<BrandModelInterface> {
        const newBrand = await this.client.brand.create({
            data: {
                name: brand.getName(),
                teamId: brand.getTeamId(),
                userId: brand.getUserId(),
                valueProposition: brand.getValueProposition(),
                brandPillars: brand.getBrandPillars(),
                brandMission: brand.getBrandMission(),
                brandInspiration: brand.getBrandInspiration(),
                currentObjective: brand.getCurrentObjective(),
                numericTarget: brand.getNumericTarget(),
                restrictions: brand.getRestrictions(),
                brandHashtags: brand.getBrandHashtags(),
                referenceContents: brand.getReferenceContents(),
                importantDates: brand.getImportantDates(),
                relevantContent: brand.getRelevantContent(),
                brandCrisis: brand.getBrandCrisis(),
                influencersAction: brand.getInfluencersAction(),
                brandManual: brand.getBrandManual(),
                updatedAt: brand.getUpdatedAt(),
                isDeleted: brand.getIsDeleted(),
            }
        });
        return newBrand;
    }

    async updateBrand(brand: BrandModel): Promise<BrandModelInterface | null> {
        const updatedBrand = await this.client.brand.update({
            where: {
                id: brand.getId(),
            },
            data: {
                name: brand.getName(),
                teamId: brand.getTeamId(),
                userId: brand.getUserId(),
                valueProposition: brand.getValueProposition(),
                brandPillars: brand.getBrandPillars(),
                brandMission: brand.getBrandMission(),
                brandInspiration: brand.getBrandInspiration(),
                currentObjective: brand.getCurrentObjective(),
                numericTarget: brand.getNumericTarget(),
                restrictions: brand.getRestrictions(),
                brandHashtags: brand.getBrandHashtags(),
                referenceContents: brand.getReferenceContents(),
                importantDates: brand.getImportantDates(),
                relevantContent: brand.getRelevantContent(),
                brandCrisis: brand.getBrandCrisis(),
                influencersAction: brand.getInfluencersAction(),
                brandManual: brand.getBrandManual(),
                updatedAt: new Date(),
                isDeleted: brand.getIsDeleted(),
            }
        });
        return updatedBrand;
    }

    async deleteBrand(id: number): Promise<BrandModelInterface | null> {
        const deletedBrand = await this.client.brand.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: 1,
                updatedAt: new Date(),
            }
        });
        return deletedBrand;
    }


}

export default BrandRepository;