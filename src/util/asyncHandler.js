const asyncHandler = (fn) => async (res, req, next) => {
    try {
        return await fn(req, res, next);
    }
    catch (err) {
        console.log(err)
        // res.status(err.code || 500).json({
        //     success: false,
        //     message: err.message
        // })
    }
}

export default asyncHandler;