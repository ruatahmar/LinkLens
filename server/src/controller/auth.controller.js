import apiError from "../util/apiError.js";
import apiResponse from "../util/apiResponse.js";
import asyncHandler from "../util/asyncHandler.js";
import { users } from "../models/users.models.js"
import { generateAccessToken, generateRefreshToken, verifyTokens } from "../util/token.js"
import bcrypt from "bcryptjs";

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
    const existedUser = await users.findOne({ email })
    if (existedUser) {
        throw new apiError(400, "User already signed up with this email")
    }
    const hashedPassword = bcrypt.hashSync(password)
    const user = await users.create({
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
        sameSite: "strict"
    }

    const createdUser = await users.findById(user._id).select(
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
                    user,
                    accessToken,
                    refreshToken
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
    const user = await users.findOne({ email })
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
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    }
    return res.status(200).cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user,
                    accessToken,
                    refreshToken
                },
                "Successfully logged in"
            )
        )
})

const logoutUser = asyncHandler()

export { registerUser, loginUser, logoutUser }