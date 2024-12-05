import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOndCloudinary } from "../utils/uploadCloudinary.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateTokens = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = await user.generateAccessToken();
  const refresh_token = await user.generateRefreshToken();

  user.refresh_token = refresh_token;
  user.save({ validateBeforeSave: false });

  return { accessToken, refresh_token };
};

const userRegister = AsyncHandler(async (req, res, next) => {
  const { user_name, email, password } = req.body;

  const emptyField = ["user_name", "email", "password"];

  const isEmptyField = emptyField.filter((field) => !req.body[field]?.trim());

  if (isEmptyField > 0) {
    next(
      new ApiError(
        400,
        `${isEmptyField.join(", ")} ${isEmptyField > 1 ? "are" : "is"} required!`,
      ),
    );
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    next(new ApiError(400, "user is already exists with this email"));
  }

  const avatarLocalPath = req?.files ? req?.files : "";
  const avatar = avatarLocalPath
    ? await uploadOndCloudinary(avatarLocalPath)
    : "";
  const user = await User.create({
    email,
    user_name,
    password,
    avatar: avatar || "",
  });

  if (!user) {
    next(new ApiError(500, " user registration failed "));
  }

  const { accessToken, refresh_token } = await generateTokens(user._id);

  const createdUser = await User.findById(user?._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refresh_token", refresh_token, options)
    .json(
      new ApiResponse(200, "user registration successfully", {
        users: createdUser,
        accessToken,
        refresh_token,
      }),
    );
});

const userLogin = AsyncHandler(async (req, res, next) => {
  // console.log(req);
  const { email, user_name, password } = req.body;

  if (!user_name && !email) {
    next(new ApiError(400, "username or email is required"));
  }
  if (!password) {
    next(new ApiError(400, "password is required"));
  }

  const isUser = await User.findOne({ email });

  if (!isUser) {
    next(new ApiError(400, "user doesnot exists with this credentials!"));
  }

  const isPasswordValid = await isUser.isCorrectPassword(password);

  if (isPasswordValid) {
    next(new ApiError(400, "wrong password!"));
  }

  const { accessToken, refresh_token } = await generateTokens(isUser._id);

  const user = await User.findById(isUser?._id).select(
    "-password -refresh_token",
  );

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refresh_token", refresh_token, options)
    .json(
      new ApiResponse(200, "user loggedin successfully", {
        user,
        accessToken,
        refresh_token,
      }),
    );
});

const refreshAccessToken = AsyncHandler(async (req, res, next) => {
  const incomingRefreshToken = req.cookies.refresh_token;

  if (!incomingRefreshToken) {
    next(new ApiError(400, "unauthorized user access", "/login"));
  }

  const decodedToken = await jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN,
  );

  if (!decodedToken) {
    next(new ApiError(400, "unauthorized user access", "/login"));
  }

  const user = await User.findById(decodedToken._id);
  if (!user) {
    next(new ApiError(400, "user doesnot exist", "/login"));
  }

  const { accessToken, newrefresh_token } = await generateTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refresh_token", newrefresh_token, options)
    .json(
      new ApiResponse(200, "token refreshed successfully", {
        accessToken,
        refresh_token: newrefresh_token,
      }),
    );
});

const userLogout = AsyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    next(new ApiError(400, "please relogoin", "/login"));
  }

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        refresh_token: "",
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refresh_token", options)
    .json(new ApiResponse(201, "user logged out successfully"));
});

const changePassword = AsyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confPassword } = req.body;

  const { userId } = req.params;

  const emptyField = ["oldPassword", "newPassword", "confPassword"];

  const isEmptyField = emptyField.filter((field) => !req.body[field]?.trim());

  if (isEmptyField > 0) {
    next(
      new ApiError(
        400,
        `${isEmptyField.join(", ")} ${isEmptyField.length > 1 ? "Are" : "is"} required! `,
      ),
    );
  }

  if (newPassword !== confPassword) {
    next(new ApiError(400, "newpassword and confirm password should match"));
  }

  if (!userId) {
    next(new ApiError(400, "invalid user id", "/login"));
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        password: newPassword,
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    next(new ApiError(400, "user doesnot exist with this userId"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "password changed successfully"));
});

const changeProfile=AsyncHandler(async(req,res,next)=>{
  const { userId } = req.body;

  const avatar = req.file.path;

  if (!userId) {
    next(new ApiError(400, "user id is required"));
  }

  if (!avatar) {
    next(new ApiError(400, "avatar is required"));
  }

  const avatarPath = await uploadOndCloudinary(avatar);
  console.log("avatarPath:", avatarPath);

  const user = await User.findOneAndUpdate(
    { user_name: userId },
    {
      $set: {
      
        avatar:avatarPath,
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    next(new ApiError(400, "invalid username", "/login"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "profile pic changed successfully", user));
})

const changeProfileInfo = AsyncHandler(async (req, res, next) => {

  const { user_name, bio, fullName,userId } = req.body;


  if (!userId) {
    next(new ApiError(400, "user id is required"));
  }


  const user = await User.findOneAndUpdate(
    { user_name: userId },
    {
      $set: {
        user_name,
        bio,
        fullName,
      },
    },
    {
      new: true,
    },
  );

  if (!user) {
    next(new ApiError(400, "invalid username", "/login"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "profile updated successfully", user));
});

const getUserProfile = AsyncHandler(async (req, res, next) => {
  const { userId } = await req.params;

  if (!userId) {
    next(new ApiError(400, "user id is required!"));
  }

  // Perform aggregation
  const profile = await User.aggregate([
    {
      $match: {
        user_name: userId,
      },
    },
    {
      $lookup: {
        from: "follows",
        foreignField: "followerId",
        localField: "_id",
        as: "totalFollowers",
      },
    },
    {
      $lookup: {
        from: "follows",
        foreignField: "followingId",
        localField: "_id",
        as: "totalFollowing",
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "owner",
        as: "posts",
      },
    },
    {
      $addFields: {
        totalPosts: { $size: "$posts" }, // Calculate total posts
      },
    },
    {
      $project: {
        posts: 1,
        totalFollowers: 1,
        totalFollowing: 1,
        totalPosts: 1,
        avatar: 1,
        user_name: 1,
        email: 1,
        _id:1,
        bio:1,
        fullName:1
        
      },
    },
  ]);

  if (!profile) {
    next(new ApiError(400, "user not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "profile fetched successfully", profile));
});

export {
  userRegister,
  userLogin,
  userLogout,
  changePassword,
  changeProfile,
  getUserProfile,
  changeProfileInfo
};
