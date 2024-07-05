import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { changeProfile, getUserProfile, userLogin, userLogout, userRegister } from "../controller/user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = Router();
router.route("/user-registration").post(upload.single("avatar"), userRegister);
router.route("/user-login").post(upload.none(),userLogin);
router.route("/logout").get(verifyUser,userLogout)
router.route("/change-profile/:userId").post(upload.single("avatar"),changeProfile)
router.route("/get-user-profile/:userId").get(getUserProfile)

export default router;


