import { AppConfig } from "../../config/AppConfig";
import { User } from "../../models/User";
import { getHashedPassword, matchHashedPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import { RESPONSE_TYPES, ReturnType } from "../../utils/types";
import { parseUser, parseUserWithPassword } from "../../utils/user";

export const findUserFromEmail = async (email: string): Promise<ReturnType> => {
  try {
    const foundUser = await User.findOne({
      email: email,
    });

    if (!foundUser) {
      return {
        type: RESPONSE_TYPES.ERROR,
        payload: {
          status: 404,
          message: "User not found!!",
        },
      };
    }

    const user = parseUserWithPassword(foundUser, foundUser._id.toString());

    return {
      type: RESPONSE_TYPES.SUCCESS,
      payload: {
        status: 200,
        message: "Successfully Found User!",
        data: user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      type: RESPONSE_TYPES.ERROR,
      payload: {
        status: 500,
        message: "Something wrong happened!",
        data: error,
      },
    };
  }
};

export const createNewUser = async (
  name: string = "",
  email: string,
  password: string,
  authProvider: string = "Email",
  image: string = "",
  role: string = AppConfig.USER_ROLES.DEFAULT
): Promise<ReturnType> => {
  try {
    const hashedPassword = await getHashedPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      authProvider,
      role
    });

    const user = parseUser(newUser, newUser._id.toString());

    return {
      type: RESPONSE_TYPES.SUCCESS,
      payload: {
        status: 200,
        message: "User created Successfully",
        data: user,
      },
    };
  } catch (error) {
    return {
      type: RESPONSE_TYPES.ERROR,
      payload: {
        status: 500,
        message: "Something wrong happened!",
        data: error,
      },
    };
  }
};
export const loginService = async (
  email: string,
  password: string,
  authProvider: string = "Email"
): Promise<ReturnType> => {
  try {
    const foundUserResponse = await findUserFromEmail(email);

    if (foundUserResponse.type === RESPONSE_TYPES.ERROR) {
      return foundUserResponse;
    }

    console.log(foundUserResponse);

    const isPasswordMatched = await matchHashedPassword(
      password,
      foundUserResponse.payload.data?.password ?? ""
    );

    if (!isPasswordMatched) {
      return {
        type: RESPONSE_TYPES.ERROR,
        payload: {
          status: 500,
          message: "Wrong Password!!",
        },
      };
    }

    const token = generateToken(
      foundUserResponse.payload.data?.id.toString() ?? "",
      email
    );

    const user = parseUser(foundUserResponse.payload.data, foundUserResponse.payload.data?.id.toString());

    return {
      type: RESPONSE_TYPES.SUCCESS,
      payload: {
        status: 200,
        message: "Successfully logged in!!",
        data: {
          ...token,
          user
        },
      },
    };
  } catch (error) {
    return {
      type: RESPONSE_TYPES.ERROR,
      payload: {
        status: 500,
        message: "Something wrong happened!",
        data: error,
      },
    };
  }
};

export const registerService = async (
  name: string = "",
  email: string,
  password: string,
  authProvider: string = "Email",
  image: string = "",
  role: string = AppConfig.USER_ROLES.DEFAULT
): Promise<ReturnType> => {
  try {
    const foundUserResponse = await findUserFromEmail(email);

    if (foundUserResponse.type === RESPONSE_TYPES.SUCCESS) {
      return {...foundUserResponse, 
        type: RESPONSE_TYPES.ERROR,
        payload: {
        ...foundUserResponse.payload,
        message: 'Email already exists!!',
        data: null,
        status: 400
      }};
    }

    const newUserResponse = await createNewUser(
      name,
      email,
      password,
      authProvider,
      image,
      role
    );

    return newUserResponse;
  } catch (error) {
    return {
      type: RESPONSE_TYPES.ERROR,
      payload: {
        status: 500,
        message: "Something wrong happened!",
        data: error,
      },
    };
  }
};
