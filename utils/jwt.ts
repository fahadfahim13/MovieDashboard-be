import * as jwt from 'jsonwebtoken';
import { AppConfig } from '../config/AppConfig';

export const generateToken = (userId: string, email: string, role = 'default') => {
    const payload = {
        id: userId,
        email,
        role
    };
    return {
        accessToken: jwt.sign(payload, AppConfig.SECRET_KEY.ACCESS_TOKEN, { expiresIn: '1h' }),
        refreshToken: jwt.sign(payload, AppConfig.SECRET_KEY.REFRESH_TOKEN, { expiresIn: '1d' })
    }
}