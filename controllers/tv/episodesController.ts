import { Request, Response } from "express";
import { createTvSeries, fetchAllTvSeries, fetchTvSeriesDetails } from "../../services/tv/seriesServices";
import { AppConfig } from "../../config/AppConfig";
import { createSeason, fetchSeasonDetails } from "../../services/tv/seasonServices";
import { createEpisode } from "../../services/tv/episodesServices";

export const createEpisodeController = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      duration = "",
      fileSize = "",
      releaseDate = "",
      seasonId
    } = req.body;

    const episodeCreateResponse = await createEpisode({
        name,
        duration,
        fileSize,
        releaseDate,
        seasonId
    });

    return res.status(episodeCreateResponse.payload.status).json({
      status: episodeCreateResponse.payload.status,
      payload: {
        message: episodeCreateResponse.payload.message,
        data: episodeCreateResponse.payload.data,
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
  