import { Router } from "express";
import { loginController } from "../controllers/auth";
import { createSeriesController, fetchSeriesDetailsController, fetchSeriesListController } from "../controllers/tv/seriesController";

const tvSeriesRoute = Router();

tvSeriesRoute.post("/create", async (req, res) => {
  return createSeriesController(req, res);
});

tvSeriesRoute.post("/get", async (req, res) => {
    return fetchSeriesListController(req, res);
  });

tvSeriesRoute.post("/get-details", async (req, res) => {
  return fetchSeriesDetailsController(req, res);
});

tvSeriesRoute.post("/edit", async (req, res) => {
    return loginController(req, res);
  });

  tvSeriesRoute.post("/delete", async (req, res) => {
    return loginController(req, res);
  });

export default tvSeriesRoute;
