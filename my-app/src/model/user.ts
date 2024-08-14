import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      // required: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
    githubId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(this.password, password);
};

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

// const fileFormat = (url: string): string => {
//   const fileExtension = url.split(".").pop()?.toLowerCase();
//   if (!fileExtension) return "file";

//   if (
//     fileExtension === "mp4"
//     fileExtension === "webm"
//     fileExtension === "ogg"
//   )
//     return "video";
//   if (
//     fileExtension === "png"
//     fileExtension === "jpg"
//     fileExtension === "jpeg"
//     fileExtension === "gif"
//   )
//     return "image";
//   if (fileExtension === "pdf") return "pdf";
//   if (fileExtension === "mp3"  fileExtension === "wav") return "audio";

//   return "file";
// };
