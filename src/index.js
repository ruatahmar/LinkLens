import express from "express";
import authRouter from "./routes/auth.routes.js"
import connectDb from "./db/index.js"
const port = process.env.port || 8000
const app = express()

app.use("/auth", authRouter)


async function start() {
    await connectDb()
    await app.listen(port, () => console.log(`server up right now on port:${port}`))
}
start()

export default app;