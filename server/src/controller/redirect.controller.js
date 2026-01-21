import { Analytics } from "../models/analytics.models.js";
import { Url } from "../models/url.models.js";
import apiError from "../util/apiError.js";
import apiResponse from "../util/apiResponse.js";
import asyncHandler from "../util/asyncHandler.js";
import getLocationFromIp from "../util/ipInfoApi.js";

const redirect = asyncHandler(async (req, res, next) => {
    const { shortCode } = req.params
    const urlExist = await Url.findOne({
        shortCode
    })
    if (!urlExist) {
        throw new apiError(400, "Url not found")
    }
    const timestamp = new Date();
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const referrer = req.get("referer") || req.get("referrer") || null;
    const userAgent = req.get("User-Agent");
    const { continent, country } = await getLocationFromIp(ipAddress)

    const newAnalytics = await Analytics.create({
        urlId: urlExist._id,
        userId: urlExist.userId,
        timestamp,
        continent,
        country,
        ipAddress,
        referrer,
        userAgent
    })
    console.log(newAnalytics)

    //updating Url model
    urlExist.clickCount += 1
    urlExist.clicksToday += 1
    const alreadyClicked = await Analytics.exists({
        urlId: urlExist._id,
        ipAddress
    })
    if (!alreadyClicked) {
        urlExist.uniqueClicks += 1
    }
    console.log(urlExist)
    await urlExist.save();

    return res.redirect(urlExist.originalUrl)

})

export default redirect;