import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, { dbName: "INSTAZONE" });
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};





