import { Router } from "express";
import { loginController } from "../controllers/auth";
import {
  createSeasonController,
  fetchSeasonDetailsController,
} from "../controllers/tv/seasonController";
import { createEpisodeController } from "../controllers/tv/episodesController";

const episodesRoute = Router();

episodesRoute.post("/create", async (req, res) => {
  return createEpisodeController(req, res);
});

episodesRoute.post("/get", async (req, res) => {
  return fetchSeasonDetailsController(req, res);
});

episodesRoute.post("/edit", async (req, res) => {
  return loginController(req, res);
});

episodesRoute.post("/delete", async (req, res) => {
  return loginController(req, res);
});

export default episodesRoute;
