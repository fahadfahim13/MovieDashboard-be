import { AppConfig } from "../../config/AppConfig";
import { ITvSeries } from "../../models/TvSeries";
import { TvSeries } from "../../models/TvSeries";
import { RESPONSE_TYPES, ReturnType } from "../../utils/types";

export const createTvSeries = async (data: ITvSeries): Promise<ReturnType> => {
  try {
    const createdSeries = await TvSeries.create({
        ...data,
        seasons: []
    });

    return {
      type: RESPONSE_TYPES.SUCCESS,
      payload: {
        status: 200,
        message: "Successfully created Tv series!",
        data: createdSeries,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      type: RESPONSE_TYPES.ERROR,
      payload: {
        status: 500,
        message: "Something wrong happened!",
        data: error,
      },
    };
  }
};

export const fetchAllTvSeries = async (limit: number = 10, page: number = 1): Promise<ReturnType> => {
    try {
      const foundSeriesList = await TvSeries.find().skip((page - 1)*limit).limit(limit);
      
      return {
        type: RESPONSE_TYPES.SUCCESS,
        payload: {
          status: 200,
          message: "Found TV Series List!",
          data: foundSeriesList,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        type: RESPONSE_TYPES.ERROR,
        payload: {
          status: 500,
          message: "Something wrong happened!",
          data: error,
        },
      };
    }
  };

  export const fetchTvSeriesDetails = async (id: string): Promise<ReturnType> => {
    try {
      const foundSeriesDetails = await TvSeries.findById(id).populate("seasons");
      
      return {
        type: RESPONSE_TYPES.SUCCESS,
        payload: {
          status: 200,
          message: "Found TV Series Details!",
          data: foundSeriesDetails,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        type: RESPONSE_TYPES.ERROR,
        payload: {
          status: 500,
          message: "Something wrong happened!",
          data: error,
        },
      };
    }
  };