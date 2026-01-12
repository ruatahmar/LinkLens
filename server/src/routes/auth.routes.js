import { registerUser, loginUser, logoutUser } from "../controller/auth.controller.js"
import { Router } from "express"
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const authRouter = Router()

authRouter.route("/login").post(loginUser);
authRouter.route("/logoutUser").post(logoutUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", jwtAuth, logoutUser);


export default authRouter;