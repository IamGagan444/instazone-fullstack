import mongoose, { Schema} from "mongoose";

const likeSchema = new Schema(
  {
    postLikes: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentLikes: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true },
);

export const Like = mongoose.model("Like", likeSchema);
