import { Router } from "express";
import jwtAuth from "../middleware/jwtAuth.middleware.js"
import { shortenUrl, getStats, getAllLinks, getLink, deleteLink } from "../controller/url.controller.js";

const urlRouter = Router()

urlRouter.post("/shorten", jwtAuth, shortenUrl)
urlRouter.get("/:shortCode/stats", jwtAuth, getStats)
urlRouter.get("", jwtAuth, getAllLinks)
urlRouter.get("/:shortCode", jwtAuth, getLink)
urlRouter.delete("/:shortCode", jwtAuth, deleteLink)

export default urlRouter;