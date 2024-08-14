import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/user.model.js'; // Adjust the path as needed
import jwt from 'jsonwebtoken';
import 'dotenv/config';

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails', 'photos'],
}, async (accessToken, refreshToken, profile, done) => {

  console.log("profile",profile)
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new User({
        user_name: profile.displayName,
        email: profile.emails[0].value,
        password: '', // No password needed for social login
        avatar: profile.photos[0].value,
      });
      await user.save();
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refresh_token = refreshToken;
    await user.save();

    return done(null, { accessToken, refreshToken });
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
