import { ZodType, z } from "zod"

export class UserValidation {
    /**
     * Schema for creating a new user account.
     * Requires username, password, and display name values.
     */
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        name: z.string().min(1).max(100),
    })

    /**
     * Schema for user login requests.
     * Validates the credentials used for authentication.
     */
    static readonly LOGIN: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
    })

    /**
     * Schema for updating user profile data.
     * Both name and password are optional, meaning they can be updated independently.
     */
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100).optional(), // optional means it is not required
        password: z.string().min(1).max(100).optional(), // optional means it is not required
    })
}
