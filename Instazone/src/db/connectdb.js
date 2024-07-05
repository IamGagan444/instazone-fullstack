import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      "mongodb connected successfully",
      connectionInstance.connection.host,
    );
    return connectionInstance.connection.host;
  } catch (error) {
    console.log("database connection failed:01");
    process.exit(1);
  }
};
