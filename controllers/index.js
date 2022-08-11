import {
  register,
  login,
  getMe
} from './UserController.js'
import {
  createPost,
  getAllPosts,
  getOnePost,
  removePost,
  updatePost
} from './PostController.js'

export const controller = {
  user: {
    register,
    login,
    getMe,
  },
  post: {
    createPost,
    getAllPosts,
    getOnePost,
    removePost,
    updatePost
  }
}