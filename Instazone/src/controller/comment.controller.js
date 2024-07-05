import { isValidObjectId } from "mongoose";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/Comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createComment = AsyncHandler(async (req, res, next) => {
  const { postId, content } = req.body;

  if (!isValidObjectId(postId)) {
    next(new ApiError(400, "post id is required!"));
  }

  const commentCount = await Comment.find({
    commentedBy: req.user?._id,
    commentedPost: postId,
  });

  console.log("commentCount", commentCount);

  if (commentCount?.length >= 10) {
    next(new ApiError(400, "you have reached your comment limit"));
  } else {
    const newComment = await Comment.create({
      commentedPost: postId,
      commentedBy: req.user._id,
      content,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "commented successfully", newComment));
  }
});

const deleteComment = AsyncHandler(async (req, res, next) => {
  const { commentId } = req.body;

  if (!isValidObjectId(commentId)) {
    next(new ApiError(400, "comment id is requried!"));
  }

  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) {
    next(new ApiError(400, "comment id doesnot exist"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "comment deleted successfully"));
});

const editComment = AsyncHandler(async (req, res, next) => {
  const { commentId, content } = req.body;

  if (!isValidObjectId(commentId)) {
    next(new ApiError(400, "comment id is required!"));
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "updated successfully", comment));
});

const getAllComment = AsyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  if (!isValidObjectId(postId)) {
    next(new ApiError(400, " comment id is required! "));
  }

  const allComment = await Comment.find({ commentedPost: postId });
  console.log("allComment:", allComment);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "all comments are fetched successfully", allComment),
    );
});

export { createComment, getAllComment, editComment, deleteComment };
