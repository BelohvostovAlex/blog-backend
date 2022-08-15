import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { router } from "./router/index.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:wwwwww@cluster0.epstaca.mongodb.net/blog?retryWrites=true&w=majority"
    );

    app.listen(PORT, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log(`Server is ready on ${PORT} port`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
