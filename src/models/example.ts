class Example {
    private message: string;

    constructor(message: string) {
        // Exemplo de validação de regra de negócio
        if (message.length < 3) {
            throw new Error("Name must have at least 3 characters.");
        }
        this.message = message;
    }

    public getMessage(): string {
        return this.message;
    }
}

export default Example;