import mongoose, { Types, Schema, mongo } from "mongoose";

const commentSchema = new Schema(
  {
    commentedPost: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },
    commentedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    count:{
      type:Number,
      // required:true,
      default:0
    }
  },
  { timestamps: true },
);

export const Comment = mongoose.model("Comment", commentSchema);
