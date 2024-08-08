import { AppConfig } from "../../config/AppConfig";
import { ISeason, Seasons } from "../../models/Season";
import { TvSeries } from "../../models/TvSeries";
import { RESPONSE_TYPES, ReturnType } from "../../utils/types";

export const createSeason = async (data: ISeason): Promise<ReturnType> => {
  try {
    const createdSeason = await Seasons.create({
        name: data.name,
        folderSize: data.folderSize,
        episodes: []
    }).then(async (doc) => {
      await TvSeries.findByIdAndUpdate(data.tvSeriesId, {
        $push: { seasons: doc._id }
      }, {
        new: true, useFindAndModify: false
      });
      return doc;
    });

    return {
      type: RESPONSE_TYPES.SUCCESS,
      payload: {
        status: 200,
        message: "Successfully created season!",
        data: createdSeason,
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


  export const fetchSeasonDetails = async (id: string): Promise<ReturnType> => {
    try {
      const foundSeasonDetails = await Seasons.findById(id).populate("episodes");
      
      return {
        type: RESPONSE_TYPES.SUCCESS,
        payload: {
          status: 200,
          message: "Found Season Details!",
          data: foundSeasonDetails,
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