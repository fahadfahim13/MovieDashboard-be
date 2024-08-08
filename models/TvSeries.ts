import { AppConfig } from "../config/AppConfig"; 
import mongoose, { Document, Schema } from "mongoose";

export interface ITvSeries {
  name: string;
  description: string;
  image?: string;
  accessType: string;
  seasons?: Schema.Types.ObjectId[];
}

const TvSeriesSchema = new mongoose.Schema<ITvSeries>(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    accessType: {
      type: String,
      default: AppConfig.MEDIA_ACCESS_TYPE.PRIVATE,
    },
    seasons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Seasons",
      },
    ],
  },
  { timestamps: true }
);

export const TvSeries = mongoose.model("TvSeries", TvSeriesSchema);
