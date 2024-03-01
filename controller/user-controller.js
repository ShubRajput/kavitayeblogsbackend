//This file will contain all user api
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/tokens.js";

dotenv.config();

export const signupUser = async (request, response) => {
  try {
    const hashpassword = await bcrypt.hash(request.body.password, 10); //2nd argument is slat, so no need to generate it seperately
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashpassword,
    };
    const newUser = new User(user); //This will validate the field using models
    await newUser.save();
    return response.status(200).json({ msg: "signup Successfull" });
  } catch (err) {
    return response.status(500).json({ msg: "Error While signup" });
  }
};

export const loginUser = async (request, response) => {
  const user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "User not Found" });
  }
  try {
    let match = bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFERESH_SECRET_KEY
      );
      const newToken = Token({ token: refreshToken });
      await newToken.save();
      return response
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          username: user.username,
          name: user.name,
        });
    } else {
      return response.status(400).json({ msg: "Password Not matched" });
    }
  } catch (err) {
    return response.status(500).json({ msg: "Error while login in user" });
  }
};

