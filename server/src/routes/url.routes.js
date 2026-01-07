import { Router } from "express";
import jwtAuth from "../middleware/jwtAuth.middleware.js"
import { shortenUrl, getStats, getAllLinks } from "../controller/url.controller.js";

const urlRouter = Router()

urlRouter.post("/shorten", jwtAuth, shortenUrl)
urlRouter.get("/:urlId/stats", jwtAuth, getStats)
urlRouter.get("", jwtAuth, getAllLinks)

export default urlRouter;