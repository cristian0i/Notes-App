import { Router } from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createdAccessToken } from "../jwt.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["the email already exist"]);

    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createdAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", validateSchema(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Email or password incorrect"]);

    const passwordCompare = await bcryptjs.compare(
      password,
      userFound.password
    );
    if (!passwordCompare)
      return res.status(400).json(["Email or password incorrect"]);

    const token = await createdAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
});

router.get("/profile", authRequired, async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(401).json({ message: "User not found " });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
    });
  } catch (e) {
    console.error(e);
  }
});

router.get("/verify", authRequired, async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(401).json({ message: "User not found"});
  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email
  });
})

export default router;
