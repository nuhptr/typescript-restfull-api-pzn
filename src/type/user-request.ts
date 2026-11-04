import { User } from "@prisma/client"
import { Request } from "express"

/**
 * Express request type used by authenticated routes.
 * It extends the default request object with the logged-in user payload
 * attached by the auth middleware after successful validation.
 */
export interface UserRequest extends Request {
    /**
     * The authenticated user associated with the current request.
     * This is populated only for protected endpoints.
     */
    user?: User
}
