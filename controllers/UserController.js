import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  validationResult
} from "express-validator";

import {
  UserModel
} from "../models/User.js";
import {
  UserDto
} from "../dtos/user-dto.js";


export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const {
      email,
      fullName,
      password,
      avatarUrl
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      email,
      fullName,
      avatarUrl,
      passwordHash,
    });

    const token = jwt.sign({
        _id: user._id,
      },
      process.env.JWT_SECRET, {
        expiresIn: "30d",
      }
    );

    const userDto = new UserDto(user);

    res.json({
      ...userDto,
      token,
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cant register a new user",
    });
  }
}

export const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body
    const currentUser = await UserModel.findOne({
      email
    })

    if (!currentUser) {
      return res.status(404).json({
        message: 'user is not found'
      })
    }

    const isValidPassword = await bcrypt.compare(password, currentUser.passwordHash)

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Incorrect login or password'
      })
    }

    const token = jwt.sign({
        _id: currentUser.id
      },
      process.env.JWT_SECRET, {
        expiresIn: '30d'
      })

    const userDto = new UserDto(currentUser)

    res.json({
      ...userDto,
      token,
      success: true,
    });


  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cant auth",
    });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: 'User is not found'
      })
    }

    const userDto = new UserDto(user);

    res.json({
      ...userDto,
      success: true,
    });

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: 'No access'
    })
  }
}