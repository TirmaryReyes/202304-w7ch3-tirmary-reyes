import { type NextFunction, type Response } from "express";
import { type UserCredentialRequest } from "../../types";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

export const loginUser = async (
  req: UserCredentialRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        401,
        "Wrong credentials",
        "Wrong credentials"
      );

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
