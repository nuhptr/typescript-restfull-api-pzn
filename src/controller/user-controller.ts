import { Request, Response, NextFunction } from "express"

import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "@/src/model/user-model"
import { UserService } from "@/src/services/user-service"
import { UserRequest } from "@/src/type/user-request"

/**
 * Handles all user-related HTTP operations.
 *
 * This controller maps HTTP requests to the user service layer and returns
 * normalized JSON responses for registration, login, profile retrieval,
 * profile updates, and logout flows.
 */
export class UserController {
    /**
     * Registers a new user account.
     */
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest
            const response = await UserService.register(request)

            res.status(201).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    /**
     * Authenticates a user and issues a valid session token.
     */
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response = await UserService.login(request)

            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    /**
     * Retrieves the authenticated user's profile information.
     */
    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!)

            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    /**
     * Updates the authenticated user's profile data.
     */
    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest
            const response = await UserService.update(req.user!, request)

            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    /**
     * Logs out the authenticated user by clearing their token.
     */
    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await UserService.logout(req.user!)

            res.status(200).json({ data: "OK" })
        } catch (error) {
            next(error)
        }
    }
}
