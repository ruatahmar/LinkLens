import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controller/auth.controller.js"
import { Router } from "express"
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const authRouter = Router()

authRouter.route("/login").post(loginUser);
authRouter.route("/logoutUser").post(logoutUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", jwtAuth, logoutUser);
authRouter.post("/refresh", refreshAccessToken)

export default authRouter;