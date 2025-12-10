class apiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong. API ERROR"
    ) {
        super(message)
        this.message = message
        this.statusCode = statusCode
    }

}

export default apiError;