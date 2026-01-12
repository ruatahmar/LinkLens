import asyncHandler from "../util/asyncHandler.js";
import apiError from "../util/apiError.js";
import apiResponse from "../util/apiResponse.js";
import mongoose from "mongoose";
import { nanoid } from 'nanoid'
import { Url } from "../models/url.models.js"
import { Analytics } from "../models/analytics.models.js";

const shortenUrl = asyncHandler(async (req, res, next) => {
    const { linkName, originalUrl, expiresAt } = req.body
    const existing = await Url.findOne({
        userId: req.user._id,
        originalUrl,
        linkName
    })
    if (existing) {
        throw new apiError(403, "Links need to be unique")
    }

    const shortCode = nanoid(10)
    const newEntry = await Url.create({
        userId: req.user._id,
        linkName,
        originalUrl,
        shortCode,
        expiresAt: expiresAt || null,
    });
    const checkEntry = await Url.findOne({
        userId: req.user._id,
        originalUrl: originalUrl
    })

    if (!checkEntry) {
        throw new apiError(400, "Entry not made in database")
    }
    const shortUrl = `${process.env.SITE_URL}${process.env.PORT}/${shortCode}`

    return res.status(200).json(
        new apiResponse(
            200,
            newEntry,
            `New url shortened: ${shortUrl}`
        )
    )

})
const getAllLinks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const allLinks = await Url.find({ userId }).sort({ createdAt: 1 })
    return res.status(200).json(
        new apiResponse(
            200,
            allLinks,
        )
    )

})
const getStats = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const { shortCode } = req.params
    const url = await Url.findOne({
        shortCode,
        userId
    })
    if (!url) {
        throw new apiError(404, "Url does not exist")
    }
    const urlId = new mongoose.Types.ObjectId(url._id);
    //find in analytics in db using both
    const urlExist = await Analytics.find({
        urlId,
        userId
    })
    //check if it exists 
    if (!urlExist) {
        throw new apiError(404, "No analytics available")
    }
    return res.status(200).json(
        new apiResponse(
            200,
            urlExist,
            "Fetch successful"
        )
    )
    //returns
})
const getLink = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { shortCode } = req.params
    const url = await Url.findOne({
        userId,
        shortCode
    })
    if (!url) {
        throw new apiError(404, "Link does not exist")
    }
    return res.status(200).json(
        new apiResponse(
            200,
            url,
            "Link Fetched"
        )
    )
})
const deleteLink = asyncHandler(async (req, res,) => {
    const userId = req.user._id
    const { shortCode } = req.params
    const url = await Url.findOneAndDelete({
        userId,
        shortCode
    })
    if (!url) {
        throw new apiError(404, "Link does not exist")
    }
    const analysis = await Analytics.deleteMany({
        userId,
        urlId: url._id

    })
    console.log(analysis)
    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Link Deleted"
        )
    )
})
export { shortenUrl, getStats, getAllLinks, getLink, deleteLink }