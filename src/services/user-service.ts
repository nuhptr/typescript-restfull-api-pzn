import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { User } from "@prisma/client"

import { prismaClient } from "@/src/application/database"
import { ResponseError } from "@/src/error/response-error"
import {
    CreateUserRequest,
    LoginUserRequest,
    UpdateUserRequest,
    UserResponse,
    toUserResponse,
} from "@/src/model/user-model"

import { UserValidation } from "@/src/validation/user-validation"
import { Validation } from "@/src/validation/validation"

/**
 * Manages user account actions such as registration, authentication,
 * profile retrieval, profile updates, and logout for the application.
 */
export class UserService {
    /**
     * Registers a new user account.
     *
     * @param request User registration payload from the client.
     * @returns The created user mapped to the public response model.
     * @throws ResponseError If the username already exists.
     */
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)

        const totalUserWithSameUsername = await prismaClient.user.count({
            where: { username: registerRequest.username },
        })

        if (totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "Username already exist")
        }

        // Hash the password before storing the account.
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({ data: registerRequest })

        return toUserResponse(user)
    }

    /**
     * Authenticates a user by username and password, then rotates the API token.
     *
     * @param request Login credentials provided by the client.
     * @returns The authenticated user with the newly generated token.
     * @throws ResponseError If the username does not exist or the password is invalid.
     */
    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        // Look up the user by username, which is treated as the unique identifier.
        let user = await prismaClient.user.findUnique({
            where: { username: loginRequest.username },
        })

        if (!user) {
            throw new ResponseError(401, "Username or password is wrong!")
        }

        const passwordIsValid = await bcrypt.compare(loginRequest.password, user.password)

        if (!passwordIsValid) {
            throw new ResponseError(401, "Username or password is wrong!")
        }

        user = await prismaClient.user.update({
            where: { username: loginRequest.username },
            data: { token: uuid() },
        })

        const response = toUserResponse(user)
        response.token = user.token! // Ensure the response contains the refreshed token.
        return response
    }

    /**
     * Returns the authenticated user's public profile information.
     *
     * @param user The current logged-in user from middleware or request context.
     * @returns The user details in response format.
     */
    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    /**
     * Updates the authenticated user's profile information.
     *
     * @param user The current user record from the database.
     * @param request New profile values submitted by the client.
     * @returns The updated user profile in response format.
     */
    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request)

        if (updateRequest.name) {
            user.name = updateRequest.name
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: { username: user.username },
            data: user,
        })

        return toUserResponse(result)
    }

    /**
     * Logs the user out by clearing the active token.
     *
     * @param user The currently authenticated user.
     * @returns The user profile after token invalidation.
     */
    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: { username: user.username },
            data: { token: null },
        })

        return toUserResponse(result)
    }
}
