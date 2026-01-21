import cron from "node-cron"
import { Url } from "../src/models/url.models.js"

export function startClicksTodayReset() {
    // Runs every day at 00:00
    cron.schedule("0 0 * * *", async () => {
        try {
            console.log("🔄 Resetting clicksToday")
            await Url.updateMany({}, { clicksToday: 0 })
        } catch (err) {
            console.error("Cron failed:", err)
        }
    })
}