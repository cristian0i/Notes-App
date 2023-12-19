import express from "express";
import morgan from "morgan";
import connectDB from "./dataBase.js";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan());
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use(taskRouter);
connectDB();

app.listen(3000, () => console.log("Listen on port 3000"));
