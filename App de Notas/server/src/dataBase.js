import { connect } from "mongoose";
import { MONGO_KEY } from "./config.js";

const connectDB = async () => {
  try {
    connect(
      MONGO_KEY
    );
    console.log("mongo is Connected");
  } catch (e) {
    console.error(e);
  }
};

export default connectDB;
