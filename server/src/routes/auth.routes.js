import { registerUser, loginUser, logoutUser } from "../controller/auth.controller.js"
import { Router } from "express"

const authRouter = Router()

authRouter.route("/login").post(loginUser);
authRouter.route("/logoutUser").post(logoutUser);
authRouter.post("/register", registerUser);


export default authRouter;