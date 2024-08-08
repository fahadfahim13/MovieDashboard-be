import express, { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppConfig } from '../config/AppConfig';

export const verifyUserAccess = async (req: Request, res: Response, next: NextFunction) => {
    // Must use verifyAccessToken function from jwt first. Or get user data from jwt first.
    console.log('Inside user access: ');
    console.log(req.body);
    const { user } = req.body;

    console.log('User found: ');
    console.log(user);

    if (!user || !user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (user.role && user.role === AppConfig.USER_ROLES.ADMIN) {
        next();
    } else {
        res.status(403).json({
            message: 'User don\'t have access to this'
        })
    }
    
}