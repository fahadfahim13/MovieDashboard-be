import { Request, Response } from "express";
import { createTvSeries, fetchAllTvSeries, fetchTvSeriesDetails } from "../../services/tv/seriesServices";
import { AppConfig } from "../../config/AppConfig";

export const createSeriesController = async (req: Request, res: Response) => {
  try {
    const {
      name = "",
      description = "",
      image = '',
      accessType = AppConfig.MEDIA_ACCESS_TYPE.PRIVATE
    } = req.body;
    const tvSeriesCreateResponse = await createTvSeries({
        name,
        description,
        image,
        seasons: [],
        accessType
    });

    return res.status(tvSeriesCreateResponse.payload.status).json({
      status: tvSeriesCreateResponse.payload.status,
      payload: {
        message: tvSeriesCreateResponse.payload.message,
        data: tvSeriesCreateResponse.payload.data,
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

  export const fetchSeriesDetailsController = async (req: Request, res: Response) => {
    try {
      const {
        id
      } = req.body;
      const tvSeriesDetailsResponse = await fetchTvSeriesDetails(id);
  
      return res.status(tvSeriesDetailsResponse.payload.status).json({
        status: tvSeriesDetailsResponse.payload.status,
        payload: {
          message: tvSeriesDetailsResponse.payload.message,
          data: tvSeriesDetailsResponse.payload.data,
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
  