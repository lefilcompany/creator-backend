type ServiceInput = {}

type ServiceOutput = {}

interface Service {
    execute(input: ServiceInput): Promise<ServiceOutput>;
}

export { Service, ServiceInput, ServiceOutput };