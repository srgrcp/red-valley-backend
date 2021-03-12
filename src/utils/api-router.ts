import { Router } from "express"
import authRouter from "../modules/auth"

const apiRouter = Router()

apiRouter.use('/auth', authRouter)

export default apiRouter
