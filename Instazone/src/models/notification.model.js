import mongoose, { Schema, Types } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "mention",
        "postLike",
        "storyLike",
        "commentLike",
        "commentReply",
        "message",
        "system",
      ],
    },
    message: {
      type: String,
      required: true,
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Notification = mongoose.model("Notification", notificationSchema);
