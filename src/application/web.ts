import express from "express"
import helmet from "helmet"

import { publicRouter } from "../route/public-api"
import { apiRouter } from "../route/api"
import { errorMiddleware } from "../middleware/error-middleware"

export const web = express()
web.use(express.json())
web.use(helmet())
web.use(publicRouter)
web.use(apiRouter)
web.use(errorMiddleware)
