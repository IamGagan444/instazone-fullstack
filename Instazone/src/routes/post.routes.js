import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { deletePost, getAllLikedPost, getReelByID, togglePublish, uploadReel } from "../controller/post.controller.js";
import { AllPosts, AllReels } from "../controller/home.controller.js";

const router = Router();
router.use(verifyUser);
router.route("/upload-reel").post(
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadReel,
);

router.route("/get-reel-by/:postId").get(getReelByID);
router.route("/toggle-publish/:postId").get(togglePublish)
router.route("/delete-post/:postId").get(deletePost)
router.route("/get-all-liked-post/:userId").get(getAllLikedPost)

router.route("/posts").get(AllPosts)
router.route("/reels").get(AllReels)

export default router;



