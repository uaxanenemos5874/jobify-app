import { StatusCodes } from "http-status-codes";
import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export async function register(req, res) {
  //This is where we CREATE the user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user"; //if first user, role === 'admin'. Simple AF ☑️
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword; //hashing password
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User created successfully ☑️",
    createdUser: user,
  });
}

export async function login(req, res) {
  try {
    console.log("🌐 Login hit: ", req.body.email);

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials! 🔴");
    }

    const isPasswordMatching = await comparePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordMatching) {
      throw new UnauthenticatedError("Invalid Password! ❌🔑");
    }

    const token = createJWT({ userId: user._id, role: user.role });
    const oneDayInMs = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + oneDayInMs),
      sameSite: "Lax",
    });

    console.log("✅ Token set");
    res.status(StatusCodes.OK).json({
      success: true,
      message: "User Logged In Successfully! ☑️",
      user,
    });
  } catch (err) {
    console.error("🔴 Login error:", err);
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}


export function logout(_, res) {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "User Logged Out Successfully ✅",
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong ❌",
    });
  }
}
