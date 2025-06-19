import { AppRoute } from "./AppRoute";
import { AddExample } from "../services/example/addExample";

// Cada conjunto de rotas deve ser uma classe que extende AppRoute.
const exampleRoute = new AppRoute("example");


// Aqui é possível adicionar middlewares que serão executados antes
// de cada rota do controller.
exampleRoute.routes.use((_, res, next) => {
    next();
});

// Aqui são definidas as rotas do controller.
exampleRoute.routes.get("/", (_, res) => {
    res.send("Hello World!");
});

// Aqui é definida uma rota que chama um serviço. Cada entidade
// do sistema é composta por um controller e várias classes de serviço,
// cada uma responsável por uma ação específica.
exampleRoute.routes.get("/new", async (_, res) => {
    const exampleService = AddExample.get();
    const message = await exampleService.execute({ name: "John" });
    res.send(message);
});

export { exampleRoute };