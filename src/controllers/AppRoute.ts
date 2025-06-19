import { Router } from "express";

class AppRoute {
    public routes: Router;
    readonly subdomain: string;
    constructor(subdomain: string) {
        this.routes = Router();
        this.subdomain = "/" + subdomain;
    }
}

export { AppRoute };