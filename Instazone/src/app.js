import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/Error.middleware.js";

export const app = express();

app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // app.use(cors({
  //   origin: (origin, callback) => {
  //     // Allow requests from your dev tunnel URL
  //     const allowedOrigins = ['https://1h2qj3x1-3000.inc1.devtunnels.ms'];
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // }));
  
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

app.use(ErrorMiddleware);
