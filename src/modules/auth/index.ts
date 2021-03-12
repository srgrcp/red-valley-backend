import { Router } from "express"
import signup from "./handlers/signup"

const authRouter = Router()

authRouter.post('/signup', signup)

export default authRouter
