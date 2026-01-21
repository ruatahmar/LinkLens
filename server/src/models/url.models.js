import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    linkName: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    clickCount: {
        type: Number,
        default: 0
    },
    uniqueClicks: {
        type: Number,
        default: 0
    },
    clicksToday: {
        type: Number,
        default: 0
    }
}, { Timestamp: true })

export const Url = mongoose.model("Url", urlSchema)