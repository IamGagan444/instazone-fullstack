import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREAT, // Click 'View Credentials' below to copy your API secret
});

export const uploadOndCloudinary = async (localFile) => {
  try {
    const uploadResult = await cloudinary.uploader
      .upload(localFile, {
        resource_type: "auto",
      })
      .catch((error) => {
        console.log("cloudinary", error);
      });

    const optimizeUrl = cloudinary.url(uploadResult.url, {
      fetch_format: "auto",
      quality: "auto",
    });

    //Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url(uploadResult.url, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    fs.unlinkSync(localFile);
    return autoCropUrl;
  } catch (error) {
    console.log("file upload failed:", error);
    fs.unlinkSync(localFile);
  }
};
