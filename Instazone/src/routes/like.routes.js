import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { commentLike, likePost } from "../controller/like.controller.js";
const router = Router();

router.route("/like-posts").post(upload.none(), likePost);
router.route("/like-comments").post(upload.none(),commentLike)



export default router;
