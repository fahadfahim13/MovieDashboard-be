import { Request, Response } from "express";
import { createTvSeries, fetchAllTvSeries, fetchTvSeriesDetails } from "../../services/tv/seriesServices";
import { AppConfig } from "../../config/AppConfig";
import { createSeason, fetchSeasonDetails } from "../../services/tv/seasonServices";

export const createSeasonController = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      folderSize = "",
      tvSeriesId
    } = req.body;

    const seasonCreateResponse = await createSeason({
        name,
        folderSize,
        tvSeriesId,
        episodes: []
    });

    return res.status(seasonCreateResponse.payload.status).json({
      status: seasonCreateResponse.payload.status,
      payload: {
        message: seasonCreateResponse.payload.message,
        data: seasonCreateResponse.payload.data,
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


export const fetchSeriesListController = async (req: Request, res: Response) => {
    try {
      const {
        limit = 10,
        page = 1,
      } = req.body;
      const tvSeriesListResponse = await fetchAllTvSeries(limit, page);
  
      return res.status(tvSeriesListResponse.payload.status).json({
        status: tvSeriesListResponse.payload.status,
        payload: {
          message: tvSeriesListResponse.payload.message,
          data: tvSeriesListResponse.payload.data,
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

export const fetchSeasonDetailsController = async (req: Request, res: Response) => {
    try {
      const {
        id
      } = req.body;
      const seasonDetailsResponse = await fetchSeasonDetails(id);
  
      return res.status(seasonDetailsResponse.payload.status).json({
        status: seasonDetailsResponse.payload.status,
        payload: {
          message: seasonDetailsResponse.payload.message,
          data: seasonDetailsResponse.payload.data,
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
  