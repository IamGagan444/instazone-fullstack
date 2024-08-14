import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/Error.middleware.js";
import passport from './middlewares/passportConfig.js'; 

export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import likeRoutes from "./routes/like.routes.js";
import commentRoutes from "./routes/comment.routes.js"

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", likeRoutes);
app.use("/api",commentRoutes)
// app.use("/",homeRouter)

passport.serializeUser(function(user,cb){
    cb(null,user)
})
passport.deserializeUser(function(user,cb){
    cb(null,user)
})

app.use(passport.initialize());

app.use(ErrorMiddleware);
