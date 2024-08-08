import { Router } from "express";
import { loginController, registerController } from "../controllers/auth";

const authRoute = Router();

authRoute.post("/register", async (req, res) => {
  return registerController(req, res);
});


authRoute.post("/login", async (req, res) => {
  return loginController(req, res);
});

export default authRoute;
