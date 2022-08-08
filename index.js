import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import {
  validationResult
} from 'express-validator'

import {
  registerValidator
} from './validations/auth.js'
import {
  UserModel
}
from './models/User.js'

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.epstaca.mongodb.net/blog?retryWrites=true&w=majority').then(() => console.log('DB ok'))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/auth/register', registerValidator, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }
    const {
      email,
      fullName,
      password,
      avatarUrl
    } = req.body

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      email,
      fullName,
      avatarUrl,
      passwordHash
    })

    const user = await doc.save()

    const token = jwt.sign({
      _id: user._id
    }, 'secret123', {
      expiresIn: '30d'
    })

    res.json({
      ...user,
      ...token,
      success: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Cant register a new user'
    })
  }
})

app.listen(4000, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Server is ready')
})