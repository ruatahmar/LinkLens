import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import connectDb from "./db/index.js"
import jwtAuth from "./middleware/jwtAuth.middleware.js";
import urlRouter from "./routes/url.routes.js";
import apiError from "./util/apiError.js";
import redirect from "./controller/redirect.controller.js";
import cors from "cors"

const port = process.env.port || 8000
const app = express()

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/auth", authRouter)
app.use("/url", urlRouter)

app.post("/tokenTester", jwtAuth, (req, res) => {
    console.log(req.user)
    return res.json({
        message: "worked"
    })
})

app.get("/:shortCode", redirect)





//global error handler
app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof apiError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message
        });
    }

    return res.status(500).json({
        status: 500,
        message: "Internal Server Error"
    });
});



//start server
async function start() {
    await connectDb()
    await app.listen(port, () => console.log(`server up right now on http//localhost:${port}`))
}
start()

export default app;