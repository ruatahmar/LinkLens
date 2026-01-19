import apiError from "../util/apiError.js";
import apiResponse from "../util/apiResponse.js";
import asyncHandler from "../util/asyncHandler.js";
import { User } from "../models/users.models.js"
import { generateAccessToken, generateRefreshToken, verifyTokens } from "../util/token.js"
import bcrypt from "bcryptjs";

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
}

const generateTokens = async (userID) => {

    const data = { _id: userID }
    const accessToken = generateAccessToken(data)
    const refreshToken = generateRefreshToken(data)

    return { accessToken, refreshToken }
}
const registerUser = asyncHandler(async (req, res) => {
    console.log("HEADERS:", req.headers)
    console.log("RAW BODY:", req.body)
    console.log("TYPE:", typeof req.body)

    const { email, password } = req.body
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new apiError(400, "User already signed up with this email")
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = await User.create({
        email,
        password: hashedPassword
    })
    const { accessToken, refreshToken } = await generateTokens(user._id)
    //store only refresh tokens
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    //return both tokens in cookies 
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new apiError(400, "Problem occured in creating user")
    }
    return res.status(200).cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user
                },
                "User account successfully created"
            )
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //get email and password
    if (!email) {
        throw new apiError(400, "Email not provided")
    }
    //check if email exist 
    const user = await User.findOne({ email })
    if (!user) {
        throw new apiError(400, "User does not exist. Please register")
    }
    //check password
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
        throw new apiError(400, "Incorrect password")
    }
    //generate access and refresh tokens
    const { accessToken, refreshToken } = await generateTokens(user._id)
    //store only refresh tokens
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    //return both tokens in cookies 

    return res.status(200).cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user
                },
                "Successfully logged in"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) {
        throw new apiError(404, "User not found")
    }
    user.refreshToken = null
    await user.save()
    return res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(
            new apiResponse(
                200,
                {},
                "Logged Out"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        throw new apiError(401, "Refresh token missing")
    }
    const payload = verifyTokens(refreshToken, "refresh")
    const userId = payload._id
    const user = await User.findById(userId)
    if (!user) {
        throw new apiError(401, "User not found")
    }
    if (refreshToken !== user.refreshToken) {
        throw new apiError(400, "Invalid refresh token")
    }

    const newAccessToken = generateAccessToken({ _id: userId })

    return res.status(200).cookie("accessToken", newAccessToken, options)
        .json(
            new apiResponse(200, { user }, "Access Token refreshed")
        )

})

export { registerUser, loginUser, logoutUser, refreshAccessToken }