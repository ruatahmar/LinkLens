import apiError from "../util/apiError";
import apiResponse from "../util/apiResponse";
import asyncHandler from "../util/asyncHandler";


const generateToken = asyncHandler(async (userID) => {
    const data = { userID }

})

const registerUser = asyncHandler(async (req, res) => {
    //get email and password 
    //check if email exists
    //if not make user 
    //generate access and refresh tokens
    //store only refresh tokens s
    //return both tokens in cookies 
})

