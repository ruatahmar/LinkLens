import { Router } from "express";
import jwtAuth from "../middleware/jwtAuth.middleware.js"
import { shortenUrl, getStats } from "../controller/url.controller.js";

const urlRouter = Router()

urlRouter.post("/shorten", jwtAuth, shortenUrl)
urlRouter.get("/:urlId/stats", jwtAuth, getStats)

export default urlRouter;