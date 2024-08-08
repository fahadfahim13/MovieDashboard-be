import { Episodes, IEpisode } from "../../models/Episode";
import { Seasons } from "../../models/Season";
import { RESPONSE_TYPES, ReturnType } from "../../utils/types";


export const createEpisode = async (data: IEpisode): Promise<ReturnType> => {
  try {
    const createdEpisode = await Episodes.create({
        name: data.name,
        duration: data.duration,
        fileSize: data.fileSize,
        releaseDate: data.releaseDate
    }).then(async (doc) => {
      await Seasons.findByIdAndUpdate(data.seasonId, {
        $push: { episodes: doc._id }
      }, {
        new: true, useFindAndModify: false
      });
      return doc;
    });

    return {
      type: RESPONSE_TYPES.SUCCESS,
      payload: {
        status: 200,
        message: "Successfully created episode!",
        data: createdEpisode,
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


  export const fetchEpisodeDetails = async (id: string): Promise<ReturnType> => {
    try {
      const foundSeasonDetails = await Seasons.findById(id).populate("episodes");
      
      return {
        type: RESPONSE_TYPES.SUCCESS,
        payload: {
          status: 200,
          message: "Found TV Series Details!",
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