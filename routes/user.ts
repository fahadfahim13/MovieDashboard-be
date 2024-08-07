import { Router } from "express";

const userRoute = Router();

userRoute.get('/all', (req, res) => {
    res.send("<h1>Welcome To user all </h1>");
  });

export default userRoute;