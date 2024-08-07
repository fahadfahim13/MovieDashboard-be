import { Router } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const authRoute = Router();

authRoute.get("/", (req, res) => {
  res.send("<h1>Welcome To JWT Authentication </h1>");
});

/**
     * @openapi
     * '/api/user/register':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
authRoute.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      authProvider = "Email",
      name = "",
      image = "",
    } = req.body;
    const isUserExist = await User.findOne({
      email: email,
    });

    if (isUserExist) {
      res.status(400).json({
        status: 400,
        payload: {
          message: "Email all ready in use",
        },
      });
      return;
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      authProvider,
    });

    return res.status(200).json({
      status: 200,
      payload: {
        message: " User created Successfully",
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      payload: {
        success: true,
        message: error,
      },
    });
  }
});


/**
* @openapi
* '/api/auth/login':
*   get:
*     description: Login API
*     summary: APi for user login
*     responses:
*       '200':
*         description: OK
*         content:
*           'application/json':
*             schema:
*               type: object
*               properties:
*                 thing:
*                   $ref: '#/components/schemas/UserAccount'
* components:
*   schemas:
*     UserAccount:
*       type: object
*       required:
*         - username
*       properties:
*         username:
*           type: string
*/
authRoute.post("/login", async (req, res) => {
  try {
    const { email, password, authProvider = "Email" } = req.body;
    const isUserExist = await User.findOne({
      email: email,
    });

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        payload: {
          message: "User not found!",
        },
      });
      return;
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      res.status(400).json({
        status: 400,
        payload: {
          message: "wrong password",
        },
      });
      return;
    }
    const token = generateToken(isUserExist._id.toString(), email);

    return res.status(200).json({
      status: 200,
      payload: {
          ...token,
        success: true,
        message: "Successfully logged in!!",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      payload: {
        success: true,
        message: error,
      },
    });
  }
});

export default authRoute;
