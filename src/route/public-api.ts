import express from "express"

import { UserController } from "@/src/controller/user-controller"

/**
 * Public-facing router for unauthenticated user endpoints.
 * These routes are intended for account creation and login flows,
 * and they do not require a valid API token.
 */
export const publicRouter = express.Router()

/**
 * Public user API endpoints:
 * - POST /api/users creates a new account
 * - POST /api/users/login authenticates a user and returns session/token data
 */
publicRouter.post("/api/users", UserController.register)
publicRouter.post("/api/users/login", UserController.login)
