import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComment,
} from "../controller/comment.controller.js";

const router = Router();

router.route("/create-comment").post(upload.none(), createComment);
router.route("/delete-comment").post(upload.none(), deleteComment);
router.route("/edit-comment").post(upload.none(), editComment);
router.route("/get-all-comment/:postId").get(getAllComment);

export default router;
