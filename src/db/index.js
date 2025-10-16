import mongoose from "mongoose"

import asyncHandler from "../util/asyncHandler.js";
import apiError from "../util/apiError.js";

const mongoUrl = process.env.MONGO_URL
const dbName = "BRUH"

const connectDb = async () => {
    try {
        await mongoose.connect(`${mongoUrl}${dbName}`);
        console.log(`MONGODB CONNECTED. DB HOST:${mongoose.connection.host}`);
    }
    catch (error) {
        throw new apiError(400, `Problem connecting database: ${error.message}`);
    }
};

export default connectDb;