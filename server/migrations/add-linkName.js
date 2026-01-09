import mongoose from "mongoose";
import { Url } from "../src/models/url.models.js";

async function updateNewField() {
    const mongoUrl = process.env.MONGO_URL
    console.log(mongoUrl)
    const dbName = "BRUH"
    try {
        await mongoose.connect(`${mongoUrl}${dbName}`);

        const result = await Url.updateMany(
            { linkName: { $exists: false } },
            { $set: { linkName: "default-name" } }
        );

        console.log("Migration result:", result);
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

updateNewField();
