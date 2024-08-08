import mongoose, { Document, Schema } from "mongoose";

export interface IEpisode {
  name: string;
  duration: string;
  fileSize?: string;
  releaseDate?: string;
  seasonId: Schema.Types.ObjectId;
}

const EpisodeSchema = new mongoose.Schema<IEpisode>(
  {
    name: {
      type: String,
      required: true,
      default: ''
    },
    duration: {
      type: String,
      required: true,
      default: ''
    },
    fileSize: {
      type: String,
      default: "",
    },
    releaseDate: {
      type: String,
      default: "",
    },
    seasonId: {
      type: Schema.Types.ObjectId,
      ref: 'Seasons'
    }
  },
  { timestamps: true }
);

export const Episodes = mongoose.model("Episodes", EpisodeSchema);
