import mongoose, { Schema } from "mongoose";

const followsSchema = new Schema(
  {
    followerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    followingId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Follow = mongoose.model("Follow", followsSchema);
