import mongoose from "mongoose";
import { MONGODB_URL } from "../constants";
let isConnected = false;


const connectToDB = async () => {
  try {
    if (isConnected) {
      return;
    }
    await mongoose.connect(MONGODB_URL, {
      dbName: "arabi-learn",
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
