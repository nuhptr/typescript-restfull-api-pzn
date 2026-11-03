import express from "express"

import { authMiddleware } from "../middleware/auth-middleware"

import { UserController } from "../controller/user-controller"
import { ContactController } from "../controller/contact-controller"
import { AdressController } from "../controller/adress-controller"

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

// TODO: Users API
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

// TODO: Contacts API
apiRouter.post("/api/contacts", ContactController.create)
// :contactId(\\d+) is a regex to ensure contactId is a number
apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get)
apiRouter.put("/api/contacts/:contactId(\\d+)", ContactController.update)
apiRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.remove)
apiRouter.get("/api/contacts", ContactController.search)

// TODO: Address API
apiRouter.post("/api/contacts/:contactId(\\d+)/addresses", AdressController.create)
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AdressController.get)
apiRouter.put("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AdressController.update)
apiRouter.delete(
    "/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)",
    AdressController.remove
)
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses", AdressController.list)
