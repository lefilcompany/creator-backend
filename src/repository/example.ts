import { PrismaClient } from "@prisma/client";
import Example from "../models/example";

class ExampleRepository {

    private client: PrismaClient;
    private static instance: ExampleRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): ExampleRepository {
        if (!ExampleRepository.instance) {
            ExampleRepository.instance = new ExampleRepository();
        }
        return ExampleRepository.instance;
    }

    async getExample() {
        return await this.client.example.findFirst();
    }

    async createExample(data: Example) {

        const example = {
            message: data.getMessage()
        }

        return await this.client.example.create({ data: example });
    }
}

export default ExampleRepository;