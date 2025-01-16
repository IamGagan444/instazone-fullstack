import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
export const verifyUser = AsyncHandler(async (req, res, next) => {

  const access_token =
    req.cookies.accessToken ||
    req?.header("authorization")?.replace("Bearer", "")

  if (!access_token) {
    next(new ApiError(400, "unauthorized user access", "/login"));
  }

  const decodedToken = await jwt.verify(access_token, process.env.ACCESS_TOKEN);
  if (!decodedToken) {
    next(new ApiError(400, "unauthorized user access", "/login"));
  }

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    next(new ApiError(400, "unauthorized user access", "/login"));
  }

  req.user = user;
  next();
});
