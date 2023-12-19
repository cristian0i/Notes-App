import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, SECRET_TOKEN, (error, user) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};
