import { User } from "@prisma/client"

/**
 * Public API representation of a user.
 */
export type UserResponse = {
    name: string
    username: string
    token?: string
}

/**
 * Payload used to create a new user account.
 */
export type CreateUserRequest = {
    name: string
    username: string
    password: string
}

/**
 * Payload used to authenticate a user.
 */
export type LoginUserRequest = {
    username: string
    password: string
}

/**
 * Payload used to update an existing user's profile.
 */
export type UpdateUserRequest = {
    name?: string
    password?: string
}

/**
 * Maps a Prisma User model into the API-safe response structure.
 *
 * @param user Prisma user entity from the database.
 * @returns User data formatted for client responses.
 */
export function toUserResponse(user: User): UserResponse {
    return {
        name: user.name,
        username: user.username,
    }
}
