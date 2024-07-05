import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    contentType: { type: String, enum: ["image", "video"], required: true },
    contentUrl: { type: String, required: true },
    thumbnail: { type: String },
    views: {
      type: Number,
    },
    caption: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
    },
    tags:{
      type:[String],
      default:[]
    }
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);
