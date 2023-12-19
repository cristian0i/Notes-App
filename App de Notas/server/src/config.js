import { config } from "dotenv";
config();

export const SECRET_TOKEN = process.env.SECRET_TOKEN;
export const MONGO_KEY = process.env.MONGO_KEY;