import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";
import { ParamsDictionary, RequestHandlerParams } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { verifyAccessToken } from "../middlewares/jwt";
import { body } from 'express-validator';

const router = Router();
const routes: {
    url: string;
    route: Router;
    middlewares: RequestHandlerParams<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
}[] = [
    {
        url: '/users',
        route: userRoute,
        middlewares: verifyAccessToken
    },
    {
        url: '/auth',
        route: authRoute,
        middlewares: [
            body('email').trim().isEmail().withMessage('Email provided is not valid!')
            .normalizeEmail().toLowerCase(),
            body('password').trim().isLength({ min: 6 }).withMessage('Minimum 6 characters required in password')
        ]
    }
]

routes.forEach((r) => router.use(r.url, r.middlewares, r.route));

export default router;