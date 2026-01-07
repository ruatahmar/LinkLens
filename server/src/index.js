import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import connectDb from "./db/index.js"
import jwtAuth from "./middleware/jwtAuth.middleware.js";
import urlRouter from "./routes/url.routes.js";
import apiError from "./util/apiError.js";
import redirect from "./controller/redirect.controller.js";
import cors from "cors"
import { getDashboardSummary } from "./controller/dashboard.controller.js";

const port = process.env.port || 8000
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRouter)
app.use("/api/url", urlRouter)

app.get("/api/dashboard/summary", jwtAuth, getDashboardSummary)
app.post("/api/tokenTester", jwtAuth, (req, res) => {
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