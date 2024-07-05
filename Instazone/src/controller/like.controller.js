import { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

const likePost = AsyncHandler(async (req, res, next) => {
  const { postId } = req.body;
  if (!isValidObjectId(postId)) {
    next(new ApiError(400, "postid is required!"));
  }

  const isLikedPost = await Like.findOne({
    $and: [{ likedBy: req.user?._id }, { postLikes: postId }],
  });

  console.log(isLikedPost);

  if (!isLikedPost) {
    const like = await Like.create({
      likedBy: req.user?._id,
      postLikes: postId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "video Liked successfully", like));
  } else {
    await Like.findByIdAndDelete(
      isLikedPost?._id,
      {
        likedBy: req.user?._id,
        postLikes: postId,
      },
      { new: true },
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "video unLiked successfully"));
  }
});

const commentLike = AsyncHandler(async (req, res, next) => {
  const { commentId } = req.body;

  if (!isValidObjectId(commentId)) {
    next(new ApiError(400, "comment id is required!"));
  }

  const isCommentLiked = await Like.findOne({
    $and: [{ likedBy: req.user._id }, { commentLikes: commentId }],
  });

  if (isCommentLiked) {
    await Like.findByIdAndDelete(
      isCommentLiked._id,
      { likedBy: req.user?._id, commentLikes: commentId },
      { new: true },
    );

    return res
      .status(200)
      .json(new ApiResponse(200, "comment unliked successfully"));
  } else {
    const like = await Like.create({
      likedBy: req.user?._id,
      commentLikes: commentId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, "comment liked successfully", like));
  }
});

const storyLike = AsyncHandler(async (req, res, next) => {});

export { likePost, commentLike };
