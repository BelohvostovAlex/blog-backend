import {
  Router
} from "express";

import {
  registerValidator,
  loginValidator
} from "../validations/auth.js";
import {
  postCreateValidator
} from '../validations/post.js'
import {
  handleValueErrors
} from '../utils/handleValueErrors.js'
import checkAuth from '../utils/checkAuth.js'
import {
  controller
} from '../controllers/index.js'
import {
  upload
} from '../multer/index.js'

const {
  user,
  post
} = controller

export const router = new Router()
router.post("/auth/register", registerValidator, handleValueErrors, user.register)
router.post('/auth/login', loginValidator, handleValueErrors, user.login)
router.get('/auth/me', checkAuth, user.getMe)

router.get('/posts', post.getAllPosts)
router.get('/posts/:id', post.getOnePost)
router.post('/posts', checkAuth, postCreateValidator, handleValueErrors, post.createPost)
router.delete('/posts/:id', checkAuth, post.removePost)
router.patch('/posts/:id', checkAuth, postCreateValidator, handleValueErrors, post.updatePost)

router.post('/uploads', checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})