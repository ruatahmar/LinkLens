import asyncHandler from "../util/asyncHandler.js";
import { nanoid } from 'nanoid'
import { Url } from "../models/url.models.js"
import apiError from "../util/apiError.js";
import apiResponse from "../util/apiResponse.js";
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
    //get id for the url from params
    const { urlId } = req.params
    //get user id from req.user
    const userId = req.user._id
    //find in analytics in db using both
    const urlExist = await Analytics.find({
        urlId,
        userId
    })
    //check if it exists 
    if (!urlExist) {
        throw new apiError(404, "Url does not exist")
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

export { shortenUrl, getStats, getAllLinks }