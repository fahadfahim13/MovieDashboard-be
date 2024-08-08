import { Request, Response } from "express";
import { loginService, registerService } from "../../services/auth";

export const registerController = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      authProvider = "Email",
      name = "",
      image = "",
      role = 'default'
    } = req.body;
    const userRegisterResponse = await registerService(
      name,
      email,
      password,
      authProvider,
      image, role
    );

    return res.status(userRegisterResponse.payload.status).json({
      status: userRegisterResponse.payload.status,
      payload: {
        message: userRegisterResponse.payload.message,
        data: userRegisterResponse.payload.data,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      payload: {
        message: "Something wrong happened!!",
        data: error,
      },
    });
  }
};
export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password, authProvider = "Email" } = req.body;
        const userLoginResponse = await loginService(
          email,
          password,
          authProvider
        );

        console.log(userLoginResponse);
        
        return res.status(userLoginResponse.payload.status).json({
          status: userLoginResponse.payload.status,
          payload: {
            message: userLoginResponse.payload.message,
            data: userLoginResponse.payload.data,
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: 500,
          payload: {
            message: "Something wrong happened!!",
            data: error,
          },
        });
      }
};
