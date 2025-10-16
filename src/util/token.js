import jwt from "jsonwebtoken"
import asyncHandler from "./asyncHandler";

const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET



const generateAccessToken = (data) => {
    return jwt.sign(
        data,
        accessTokenSecret,
        {
            expiresIn: accessTokenExpiry
        }
    )
}

const generateRefreshToken = (data) => {
    return jwt.sign(
        data,
        refreshTokenSecret,
        {
            expiresIn: refreshTokenExpiry
        }
    )
}

const refreshAccessToken = asyncHandler()

const Mode = {
    refresh: refreshTokenSecret,
    access: accessTokenSecret,
};


const verifyTokens = (token, mode) => {
    if (!Object.values(Mode).includes(mode)) {
        throw new Error("Invalid mode");
    }
    const secret = Mode[mode]
    return jwt.verify(
        token,
        secret
    )
} 