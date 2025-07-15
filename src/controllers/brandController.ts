import { BrandInformation } from "../enums/brandInformation";
import BrandRepository from "../repository/brandRepository";
import { CreateBrand } from "../services/brand/createBrand";
import { GetAllBrands } from "../services/brand/getAllBrands";
import { GetAllBrandsActive } from "../services/brand/getAllBrandsActive";
import { GetBrandById } from "../services/brand/getBrandById";
import { GetBrandsByTeamId } from "../services/brand/getBrandsByTeamId";
import { GetBrandsByTeamIdActive } from "../services/brand/getBrandsByTeamIdActive";
import { GetBrandsByUserId } from "../services/brand/getBrandsByUserId";
import { GetBrandsByUserIdActive } from "../services/brand/getBrandsByUserIdActive";
import { UpdateBrand } from "../services/brand/updateBrand";
import { handleError } from "../utils/errorHandler";
import { AppRoute } from "./AppRoute";

const brandRoute = new AppRoute('brand');

brandRoute.routes.get('/', async(_, res) => {
    try {
        const brandService = GetAllBrands.getInstance();
        const allBrands = await brandService.execute();

        res.status(200).json(allBrands);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.get('/active', async (_, res) => {
    try {
        const brandService = GetAllBrandsActive.getInstance();
        const activeBrands = await brandService.execute();

        res.status(200).json(activeBrands);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const brandService = GetBrandById.getInstance();
        const brand = await brandService.execute({ id: Number(id) });
        if (!brand) {
            throw new Error(BrandInformation.BRAND_NOT_FOUND);
        }

        res.status(200).json(brand);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const brandService = GetBrandsByTeamId.getInstance();
        const brands = await brandService.execute({ teamId: Number(teamId) });

        res.status(200).json(brands);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.get('/team/:teamId/active', async (req, res) => {
    try {
        const { teamId } = req.params;
        const brandService = GetBrandsByTeamIdActive.getInstance();
        const activeBrands = await brandService.execute({ teamId: Number(teamId)});

        res.status(200).json(activeBrands);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const brandService = GetBrandsByUserId.getInstance();
        const brands = await brandService.execute({ 
            userId: Number(userId) 
        });
        res.status(200).json(brands);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.get('/user/:userId/active', async (req, res) => {
    try {
        const { userId } = req.params;
        const brandService = GetBrandsByUserIdActive.getInstance();
        const activeBrands = await brandService.execute({
            userId: Number(userId) 
        });
        res.status(200).json(activeBrands);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.post("/", async (req, res) => {
    try {
        const {
            name,
            teamId,
            userId,
            valueProposition,
            brandPillars,
            brandMission,
            brandInspiration,
            currentObjective,
            numericTarget,
            restrictions,
            brandHashtags,
            referenceContents,
            importantDates,
            relevantContent,
            brandCrisis,
            influencersAction,
            brandManual
        } = req.body;

        const brandService = CreateBrand.getInstance();

        const newBrand = await brandService.execute({
            brand: {
                id: undefined,
                name,
                teamId,
                userId,
                valueProposition,
                brandPillars,
                brandMission,
                brandInspiration,
                currentObjective,
                numericTarget,
                restrictions,
                brandHashtags,
                referenceContents,
                importantDates,
                relevantContent,
                brandCrisis,
                influencersAction: influencersAction || 0,
                brandManual: brandManual || 0,
                createdAt: undefined,
                updatedAt: null,
                isDeleted: 0
            }
        });

        res.status(201).json(newBrand);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const brandRepository = BrandRepository.get();
        const existingBrand = await brandRepository.getBrandById(Number(id));

        if (!existingBrand) {
            throw new Error(BrandInformation.BRAND_NOT_FOUND);
        }

        const {
            name,
            teamId,
            userId,
            valueProposition,
            brandPillars,
            brandMission,
            brandInspiration,
            currentObjective,
            numericTarget,
            restrictions,
            brandHashtags,
            referenceContents,
            importantDates,
            relevantContent,
            brandCrisis,
            influencersAction,
            brandManual
        } = req.body;

        const brandService = UpdateBrand.getInstance();
        const updatedBrand = await brandService.execute({
            brand: {
                id: Number(id),
                name: name ?? existingBrand.name,
                teamId: teamId ?? existingBrand.teamId,
                userId: userId ?? existingBrand.userId,
                valueProposition: valueProposition ?? existingBrand.valueProposition,
                brandPillars: brandPillars ?? existingBrand.brandPillars,
                brandMission: brandMission ?? existingBrand.brandMission,
                brandInspiration: brandInspiration ?? existingBrand.brandInspiration,
                currentObjective: currentObjective ?? existingBrand.currentObjective,
                numericTarget: numericTarget ?? existingBrand.numericTarget,
                restrictions: restrictions ?? existingBrand.restrictions,
                brandHashtags: brandHashtags ?? existingBrand.brandHashtags,
                referenceContents: referenceContents ?? existingBrand.referenceContents,
                importantDates: importantDates ?? existingBrand.importantDates,
                relevantContent: relevantContent ?? existingBrand.relevantContent,
                brandCrisis: brandCrisis ?? existingBrand.brandCrisis,
                influencersAction: influencersAction ?? existingBrand.influencersAction,
                brandManual: brandManual ?? existingBrand.brandManual,
                createdAt: existingBrand.createdAt,
                updatedAt: new Date(),
                isDeleted: existingBrand.isDeleted
            }
        });

        res.status(200).json(updatedBrand);
    } catch (error: any) {
        handleError(error, res);
    }
});

brandRoute.routes.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const brandRepository = BrandRepository.get();
        const existingBrand = await brandRepository.getBrandById(Number(id));
        if (!existingBrand) {
            throw new Error(BrandInformation.BRAND_NOT_FOUND);
        }

        await brandRepository.deleteBrand(Number(id));

        res.status(200).json({ message: BrandInformation.BRAND_DELETED });
    } catch (error: any) {
        handleError(error, res);
    }
});

export default brandRoute;