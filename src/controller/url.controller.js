import asyncHandler from "../util/asyncHandler.js";
import { nanoid } from 'nanoid'
import { url } from "../models/url.models.js"
import apiError from "../util/apiError.js";
import apiResponse from "../util/apiResponse.js";

const shortenUrl = asyncHandler(async (req, res, next) => {
    const { originalUrl, expiresAt } = req.body
    const existing = await url.findOne({
        userId: req.user._id,
        originalUrl: originalUrl
    })
    if (existing) {
        throw new apiError(403, "Url already shortened.")
    }

    const shortCode = nanoid(10)
    const newEntry = await url.create({
        userId: req.user._id,
        originalUrl,
        shortCode,
        expiresAt: expiresAt || null,
    });
    const checkEntry = await url.findOne({
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



export { shortenUrl }