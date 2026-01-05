import { url } from "inspector";
import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema({
    urlId: {
        type: Schema.Types.ObjectId,
        ref: "url",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String
    },
    referrer: {
        type: String
    },
    userAgent: {
        type: String
    }

})

export const Analytics = mongoose.model("Analytics", analyticsSchema)
