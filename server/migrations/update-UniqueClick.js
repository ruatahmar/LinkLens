import mongoose from "mongoose";
import { Url } from "../src/models/url.models.js";
import { Analytics } from "../src/models/analytics.models.js";

async function updateUniqueClick() {
    try {
        await mongoose.connect()
        const links = await Url.find({}, { _id: 1 })
        for (const link of links) {
            const analytics = await Analytics.distinct("ipAddress", { urlId: link._id })
            await Url.updateOne(
                { _id: link._id },
                { $set: { uniqueClicks: analytics.length } }
            );
        }

    } catch (error) {
        console.log(error)
    }
    console.log("Migration complete")
    process.exit(0)
}
updateUniqueClick()