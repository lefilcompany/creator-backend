// Inputs e Outputs são os dados de entrada e saída de cada caso de uso.
// São usados para que possamos definir exatamente o que é esperado de cada caso de uso,
// facilitando a manutenção do código e a compreensão do que cada um faz.

import Example from "../../models/example";
import { Service, ServiceOutput, ServiceInput } from "../service";
import ExampleRepository from "../../repository/example";

interface AddExampleInput extends ServiceInput {
    name: string;
}

interface AddExampleOutput extends ServiceOutput {
    message: string;
}

export class AddExample implements Service {

    // -- Singleton --
    // Esse design pattern é utilizado para garantir que apenas uma instância
    // desta classe seja criada, mesmo que vários controllers a usem.
    // Ex: se um controller em /example e outro em /example2 chamarem
    // AddExample.get(), ambos receberão a mesma instância de AddExample,
    // evitando que a classe seja instanciada várias vezes.
    private static instance: AddExample;
    private repository: ExampleRepository;

    private constructor() {
        this.repository = ExampleRepository.get();
    }

    public static get(): AddExample {
        if (!AddExample.instance) {
            AddExample.instance = new AddExample();
        }
        return AddExample.instance;
    }

    public async execute(input: AddExampleInput): Promise<AddExampleOutput> {
        // normalmente aqui se faz a lógica de negócio e a interação
        // com o banco de dados (a partir de classes de repositório)

        // -- exemplo de uso da classe de modelo --
        // normalmente, a classe de modelo é onde a lógica de negócio
        // é realizada. Por exemplo, a classe de modelo pode conter
        // métodos que realizam cálculos, validações, etc.

        // Ex: a classe example não permite nomes com menos de 3 caracteres
        // Essa lógica é feita dentro da classe de modelo e não aqui
        const example = new Example(input.name);

        // Exemplo de interação com o banco de dados
        // const get = await this.repository.getExample();

        return {
            message: `Hello, ${example.getMessage()}!`
        };
    }
}