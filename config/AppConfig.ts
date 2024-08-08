export const AppConfig = {
    SECRET_KEY: {
        ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN_SECRET_KEY as string,
        REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string
    },
    DATABASE:{
        URL: process.env.DATABASE_URL as string
    },
    PORT: parseInt(process.env.PORT as string),
    USER_ROLES: {
        ADMIN: 'ADMIN',
        DEFAULT: 'default'
    },
    MEDIA_ACCESS_TYPE: {
        PUBLIC: 'PUBLIC',
        PRIVATE: 'PRIVATE'
    }
}