import { Router } from "express";
import { AppRoute } from "../controllers/AppRoute";

export default function mountRoutes(router: Router, routes: AppRoute[]) {
    routes.forEach((route) => {
        router.use(route.subdomain, route.routes);
    });
}