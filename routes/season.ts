import { Router } from "express";
import { loginController } from "../controllers/auth";
import {
  createSeasonController,
  fetchSeasonDetailsController,
} from "../controllers/tv/seasonController";

const seasonRoute = Router();

seasonRoute.post("/create", async (req, res) => {
  return createSeasonController(req, res);
});

seasonRoute.post("/get", async (req, res) => {
  return fetchSeasonDetailsController(req, res);
});

seasonRoute.post("/edit", async (req, res) => {
  return loginController(req, res);
});

seasonRoute.post("/delete", async (req, res) => {
  return loginController(req, res);
});

export default seasonRoute;
