import mongoose from "mongoose";
import { Analytics } from "../src/models/analytics.models.js";
async function updateLocationData() {
    const mongoUrl = process.env.MONGO_URL
    const dbName = "BRUH"
    try {
        await mongoose.connect(`${mongoUrl}/${dbName}`)
        const data = await Analytics.updateMany(
            {
                country: { $exists: false },
                continent: { $exists: false }
            },
            {
                $set: {
                    continent: "",
                    country: "Localhost"
                }
            }
        )
    }
    catch (err) {
        console.log("migration failed", err)
    }
    finally {
        await mongoose.disconnect()
        process.exit(0)
    }
}

updateLocationData()