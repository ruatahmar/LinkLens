import { Url } from "../models/url.models.js"
import mongoose from "mongoose";
import apiResponse from "../util/apiResponse.js";
import asyncHandler from "../util/asyncHandler.js"

const getDashboardSummary = asyncHandler(async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const totalLinks = await Url.countDocuments({ userId })
    const clicksAgg = await Url.aggregate([
        { $match: { userId } },
        {
            $group: {
                _id: null,
                totalClicks: { $sum: "$clickCount" }
            }
        }
    ]);

    const totalClicks = clicksAgg[0]?.totalClicks || 0;


    return res.status(200).json(
        new apiResponse(
            200,
            {
                totalLinks,
                totalClicks
            },
            "Data successfully sent"
        )
    )
})

export { getDashboardSummary };