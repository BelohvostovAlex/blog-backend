import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";

import {
  registerValidator,
  loginValidator
} from "./validations/auth.js";
import {
  postCreateValidator
} from './validations/post.js'
import checkAuth from './utils/checkAuth.js'
import {
  register,
  login,
  getMe
} from './controllers/UserController.js'
import {
  createPost,
  getAllPosts,
  getOnePost,
  removePost
} from './controllers/PostController.js'

const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());


app.post("/auth/register", registerValidator, register)
app.post('/auth/login', loginValidator, login)
app.get('/auth/me', checkAuth, getMe)

app.post('/posts', checkAuth, postCreateValidator, createPost)
app.get('/posts', getAllPosts)
app.get('/posts/:id', getOnePost)
app.delete('/posts/:id', checkAuth, removePost)

const start = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://admin:wwwwww@cluster0.epstaca.mongodb.net/blog?retryWrites=true&w=majority"
      )

    app.listen(PORT, (err) => {
      if (err) {
        return console.log(err);
      }

      console.log("Server is ready");
    });
  } catch (error) {
    console.log(error.message)
  }
}

start()