import {
  body
} from "express-validator"

export const postCreateValidator = [
  body('title', 'Enter the title of post').isLength({
    min: 3
  }).isString(),
  body('text', 'Enter the text of post').isLength({
    min: 10
  }).isString(),
  body('tags', 'provide an array of tags').optional().isArray(),
  body('imageUrl', 'incorrect link').optional().isString(),
]