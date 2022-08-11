import {
  body
} from "express-validator"

export const registerValidator = [
  body('email', 'incorrect email').isEmail(),
  body('password', 'pass field has to have at least 5 symbols').isLength({
    min: 5
  }),
  body('fullName', 'fullname field has to have at least 3 symb').isLength({
    min: 3
  }),
  body('avatarUrl', 'incorrect link').optional().isURL(),
]

export const loginValidator = [
  body('email', 'incorrect email').isEmail(),
  body('password', 'pass field has to have at least 5 symbols').isLength({
    min: 5
  }),
]