import mongoose from "mongoose";
import { Url } from "../src/models/url.models.js";

async function addClickData() {
    try {
        await mongoose.connect()
        const data = await Url.updateMany(
            {
                uniqueClicks: { $exists: false },
                clicksToday: { $exists: false }
            },
            {
                $set: {
                    uniqueClicks: 0,
                    clicksToday: 0
                }
            }
        )
    } catch (error) {
        console.log("Error ", error)
    }
    console.log("Migration successful")
}

addClickData()