import express from "express";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import connectDb from "./db/index.js"
import jwtAuth from "./middleware/jwtAuth.middleware.js";
const port = process.env.port || 8000
const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/auth", authRouter)

app.post("/tokenTester", jwtAuth, (req, res) => {
    console.log(req.user)
    return res.json({
        message: "worked"
    })
})

//start server
async function start() {
    await connectDb()
    await app.listen(port, () => console.log(`server up right now on http//localhost:${port}`))
}
start()

export default app;