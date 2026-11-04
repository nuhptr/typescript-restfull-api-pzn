import { NextFunction, Response } from "express"

import { prismaClient } from "@/src/application/database"
import { UserRequest } from "@/src/type/user-request"

/**
 * Protects private routes by validating the `X-API-TOKEN` header.
 *
 * If a valid token matches a user record, the authenticated user is attached to
 * the request and the request continues. Otherwise, the middleware responds
 * with a 401 Unauthorized error.
 */
export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.get("X-API-TOKEN")?.trim()

    if (token) {
        const user = await prismaClient.user.findFirst({ where: { token: token } })

        if (user) {
            req.user = user

            next()
            return
        }
    }

    res.status(401).json({ errors: "Unauthorized" }).end()
}
