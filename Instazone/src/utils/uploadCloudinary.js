import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "gaganbro",
  api_key: "586139518465632",
  api_secret: process.env.CLOUDNARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
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
