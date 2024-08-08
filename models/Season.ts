import mongoose, { Document, Schema } from "mongoose";

export interface ISeason {
  name: string;
  folderSize?: string;
  episodes: Schema.Types.ObjectId[];
  tvSeriesId: Schema.Types.ObjectId;
}

const SeasonSchema = new mongoose.Schema<ISeason>(
  {
    name: {
      type: String,
      required: true,
      default: ''
    },
    folderSize: {
      type: String,
      default: "",
    },
    episodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Episodes"
      }
    ],
    tvSeriesId: {
      type: Schema.Types.ObjectId,
      ref: 'TvSeries'
    }
  },
  { timestamps: true }
);

export const Seasons = mongoose.model("Seasons", SeasonSchema);
