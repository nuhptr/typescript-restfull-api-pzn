import express from "express"

import { authMiddleware } from "@/src/middleware/auth-middleware"

import { UserController } from "@/src/controller/user-controller"
import { ContactController } from "@/src/controller/contact-controller"
import { AdressController } from "@/src/controller/adress-controller"

/**
 * Router for all authenticated API endpoints.
 *
 * This router enforces authentication for every protected route and groups all
 * user, contact, and address operations under a single API surface.
 */
export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

/**
 * Endpoints for the currently authenticated user profile.
 */
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

/**
 * Contact management endpoints.
 *
 * Route parameters are constrained to numeric IDs to ensure valid contact
 * identifiers are passed to the controller layer. The pattern `:contactId(\d+)`
 * means: `:contactId` captures the URL parameter, and `(\d+)` matches only
 * one or more numeric digits, so values like `/api/contacts/123` are valid while
 * non-numeric IDs such as `/api/contacts/abc` are rejected by the router.
 */
apiRouter.post("/api/contacts", ContactController.create)
apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get)
apiRouter.put("/api/contacts/:contactId(\\d+)", ContactController.update)
apiRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.remove)
apiRouter.get("/api/contacts", ContactController.search)

/**
 * Address endpoints for a specific contact.
 */
apiRouter.post("/api/contacts/:contactId(\\d+)/addresses", AdressController.create)
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AdressController.get)
apiRouter.put("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AdressController.update)
apiRouter.delete(
    "/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)",
    AdressController.remove,
)
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses", AdressController.list)
