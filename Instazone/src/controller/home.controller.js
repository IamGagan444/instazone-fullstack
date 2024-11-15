import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

const AllPosts = AsyncHandler(async (req, res, next) => {
  const { skip = 0, limit = 10 } = req.query;

  const posts = await Post.find({})
    .populate("owner", "user_name avatar")
    .sort({ createdAt: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit));


  if (!posts) {
    next(new ApiError(400, "no posts are available"));
  }
  console.log("post",posts)
  return res.status(200).json(new ApiResponse(200,"data fetched successfully", posts));
});

const AllReels = AsyncHandler(async (req, res, next) => {
  const { skip = 0, limit = 10 } = req.query;

  const posts = await Post.find({ contentType: "video" })
    .populate("owner")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(0);

  if (posts.length === 0) {
    next(new ApiError(400, "no posts are available"));
  }

  return res.status(200).json(new ApiResponse(200, posts));
});

export { AllPosts, AllReels };
