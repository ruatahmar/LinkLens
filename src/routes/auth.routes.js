//login 
//register
//logout
import { Router } from "express"

const authRouter = Router()

userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);
userRouter.route("/logoutUser").post(logoutUser);

export default authRouter;