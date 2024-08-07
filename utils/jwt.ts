import * as jwt from 'jsonwebtoken';

const accessSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string;
const refreshSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string;

export const generateToken = (userId: string, email: string, role = 'default') => {
    const payload = {
        id: userId,
        email,
        role
    };
    return {
        accessToken: jwt.sign(payload, accessSecretKey, { expiresIn: '1h' }),
        refreshToken: jwt.sign(payload, refreshSecretKey, { expiresIn: '1d' })
    }
}