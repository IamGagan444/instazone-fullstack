import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { changeProfile, changeProfileInfo, getUserProfile, userLogin, userLogout, userRegister } from "../controller/user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";



const router = Router();
router.route("/user-registration").post(upload.single("avatar"), userRegister);
router.route("/user-login").post(upload.none(),userLogin);
router.route("/logout").get(verifyUser,userLogout)
router.route("/change-profile").post(verifyUser,upload.single("avatar"),changeProfile)
router.route("/change-profile-info").post(verifyUser,changeProfileInfo)
router.route("/get-user-profile/:userId").get(verifyUser,getUserProfile)


router.route("/logout").get(function(req,res){
  req.logOut()
  res.redirect("/")
})

export default router;


