import {User, registerValidation, loginValidation, emailValidation} from '../models/userModel.js';
import {sendEmail} from '../utils/sendEmail.js';
import crypto from "crypto";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});
  const user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).json({message: "User already exists"});
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
  return res.status(201).json({message: "User created successfully", user: newUser, token});
};

export const login = async (req, res) => {
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).json({message: "invalid email or password"});
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).json({message: "invalid email or password"});
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
  return res.status(200).json({message: "User logged in successfully", user, token});
};

export const forgetPassword = async (req, res) => {
  try {
    const {error} = emailValidation(req.body || {});
    if(error) return res.status(400).json({message: error.details[0].message});

    const user = await User.findOne({email: req.body.email});
    if(user){
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
      user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
      await user.save();

      if(!process.env.FRONTEND_URL) throw new Error("FRONTEND_URL is not configured");
      const resetUrl = new URL("/reset-password", process.env.FRONTEND_URL);
      resetUrl.searchParams.set("token", resetToken);
      await sendEmail(
        user.email,
        "Reset your password",
        `Use this link to reset your password within 30 minutes:\n\n${resetUrl.toString()}`
      );
    }

    return res.status(200).json({message: "If an account exists for that email, we sent a password reset link."});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: "Server error"});
  }
};

export const resetPassword = async (req, res) => {
  try {
    const {token, newPassword} = req.body || {};
    if(typeof token !== "string" || !token){
      return res.status(400).json({message: "A reset token is required"});
    }
    if(typeof newPassword !== "string" || newPassword.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetTokenHash: tokenHash,
      resetTokenExpires: {$gt: new Date()}
    }).select("+resetTokenHash +resetTokenExpires");
    if(!user){
      return res.status(400).json({message: "Invalid or expired reset link"});
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetTokenHash = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    return res.status(200).json({message: "Password updated successfully"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: "Server error"});
  }
};
