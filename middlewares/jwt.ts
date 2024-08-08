import express, { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from '../config/AppConfig';


export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || req.headers.Authorization) as string;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token.split(' ')[1], AppConfig.SECRET_KEY.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.body.user = decoded;
        next();
    });
}

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || req.headers.Authorization) as string;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token.split(' ')[1], AppConfig.SECRET_KEY.REFRESH_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.body.user = decoded;
        next();
    });
}