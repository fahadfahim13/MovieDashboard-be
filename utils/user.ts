import { AppConfig } from "../config/AppConfig";
import { IUser } from "../models/User";

export const parseUser = (foundUser: IUser, id: string) => {
    return {
        name: foundUser.name,
        email: foundUser.email,
        authProvider: foundUser.authProvider,
        image: foundUser.image,
        id,
        role: foundUser.role ?? AppConfig.USER_ROLES.DEFAULT
    }
}

export const parseUserWithPassword = (foundUser: IUser, id: string) => {
    return {
        name: foundUser.name,
        email: foundUser.email,
        password: foundUser.password,
        authProvider: foundUser.authProvider,
        image: foundUser.image,
        id,
        role: foundUser.role ?? AppConfig.USER_ROLES.DEFAULT
    }
}