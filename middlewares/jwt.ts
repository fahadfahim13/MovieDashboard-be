import express, { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const accessSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string;
const refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string;

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || req.headers.Authorization) as string;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token.split(' ')[1], accessSecretKey, (err, decoded) => {
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

    jwt.verify(token.split(' ')[1], refreshSecretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.body.user = decoded;
        next();
    });
}