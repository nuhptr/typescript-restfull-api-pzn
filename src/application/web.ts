import express from "express"
import helmet from "helmet"

import { publicRouter } from "@/src/route/public-api"
import { apiRouter } from "@/src/route/api"
import { errorMiddleware } from "@/src/middleware/error-middleware"

/**
 * Express application instance used by the API server.
 *
 * It configures JSON request parsing, security headers, route mounting,
 * and a centralized error handler so every request passes through the
 * same application middleware pipeline.
 */
export const web = express()

web.use(express.json())
web.use(helmet())
web.use(publicRouter)
web.use(apiRouter)
web.use(errorMiddleware)
