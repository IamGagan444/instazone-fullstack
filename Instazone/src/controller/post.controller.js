import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { uploadOndCloudinary } from "../utils/uploadCloudinary.js";
import { Like } from "../models/like.model.js";

const uploadReel = AsyncHandler(async (req, res, next) => {
  const { caption, isPublished, tags } = req.body;

  const files = req.files;
  // console.log("fioles", files?.file && "Gagan pallai");

  const thumbnailLocalPath = files.thumbnail ? files?.thumbnail[0]?.path : "";
  const fileLocalpath = files.file && files?.file[0]?.path;

  if (!fileLocalpath) {
    next(new ApiError(400, "file is required!"));
  }

  let contentType;
  const fileMimetype = files?.file[0]?.mimetype;
  if (fileMimetype?.startsWith("image/")) {
    contentType = "image";
  } else if (fileMimetype?.startsWith("video/")) {
    contentType = "video";
  } else {
    return next(new ApiError(400, "unsupported file type"));
  }

  const thumbnail =
    thumbnailLocalPath && (await uploadOndCloudinary(thumbnailLocalPath));
  const myReel = fileLocalpath && (await uploadOndCloudinary(fileLocalpath));

  const uploadReel = await Post.create({
    thumbnail,
    contentUrl: myReel,
    contentType,
    caption,
    isPublished,
    owner: req.user?._id,
    tags,
  });

  if (!uploadReel) {
    next(new ApiError(500, " video upload failed "));
  }

  return res.status(200).json(
    new ApiResponse(200, " post uploaded successfull ", {
      data: uploadReel,
    }),
  );
});

const getReelByID = AsyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    next(new ApiError(400, "postid is required!"));
  }

  const myReel = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "postLikes",
        localField: "_id",
        as: "totalPostLikes",
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "commentedPost",
        localField: "_id",
        as: "totalComment",
      },
    },
  ]);

  if (!myReel[0].isPublished && myReel[0].owner.toString() === req.user?._id) {
    return res
      .status(200)
      .json(new ApiResponse(200, "data fetched successfully", myReel));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "data fetched successfully", myReel));
});

const deletePost = AsyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    next(new ApiError(400, " post id is required! "));
  }

  const reel = await Post.findById(postId);

  if (!reel) {
    next(new ApiError(400, "post doesnot exist"));
  }

  if (req.user._id.toString() === reel.owner.toString()) {
    await Post.findByIdAndDelete(reel._id);
    return res
      .status(200)
      .json(new ApiResponse(200, `post deleted successfully`));
  } else {
    next(new ApiError(400, "you are not the video owner"));
  }
});

const togglePublish = AsyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    next(new ApiError(400, " post id is required! "));
  }

  const reel = await Post.findById(postId);
  if (!reel) {
    next(new ApiError(400, "post doesnot exist"));
  }

  if (req.user._id.toString() === reel.owner.toString()) {
    console.log();
    reel.isPublished = !reel.isPublished;
    reel.save({ validateBeforeSave: false });
    return res.status(200).json(
      new ApiResponse(200, `ispublished is ${reel.isPublished}`, {
        status: reel.isPublished,
      }),
    );
  } else {
    next(new ApiError(400, "you are not the video owner"));
  }
});

const getAllLikedPost = AsyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    next(new ApiError(400, "user id is required"));
  }

  const likedPosts = await Like.find({ likedBy: userId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "all liked videos fetched successfully", likedPosts),
    );
});

export { uploadReel, getReelByID, togglePublish, deletePost, getAllLikedPost };
