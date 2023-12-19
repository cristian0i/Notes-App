import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "./config.js";

export function createdAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_TOKEN, {}, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}
