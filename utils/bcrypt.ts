import bcrypt from "bcrypt";


export const getHashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

export const matchHashedPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
}