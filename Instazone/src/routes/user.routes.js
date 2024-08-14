import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { changeProfile, getUserProfile, userLogin, userLogout, userRegister } from "../controller/user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import passport from "../middlewares/passportConfig.js";


const router = Router();
router.route("/user-registration").post(upload.single("avatar"), userRegister);
router.route("/user-login").post(upload.none(),userLogin);
router.route("/logout").get(verifyUser,userLogout)
router.route("/change-profile/:userId").post(upload.single("avatar"),changeProfile)
router.route("/get-user-profile/:userId").get(getUserProfile)

router.route('/auth/facebook').get( passport.authenticate('facebook', { scope: ['public_profile','email'] }));
router.route('/auth/facebook/callback').get(function(){
  passport.authenticate('facebook',{
    successRedirect:"/",
    failureRedirect:"/nothing-failure"
    
  })
});

router.route("/logout").get(function(req,res){
  req.logOut()
  res.redirect("/")
})

export default router;


