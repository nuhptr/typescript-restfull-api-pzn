import { ZodType, z } from "zod"

export class ContactValidation {
    /**
     * Schema for creating a new contact.
     * Requires a non-empty first name and optional details for last name, email, and phone.
     */
    static readonly CREATE: ZodType = z.object({
        first_name: z.string().min(1).max(100),
        last_name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(13).optional(),
    })

    /**
     * Schema for updating an existing contact.
     * Requires the contact id and validates the updated personal data.
     */
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        first_name: z.string().min(1).max(100),
        last_name: z.string().min(1).max(100).optional(),
        email: z.string().min(1).max(100).email().optional(),
        phone: z.string().min(1).max(13).optional(),
    })

    /**
     * Schema for searching contacts with optional filters and pagination.
     * Allows name, email, and phone search along with page and size values.
     */
    static readonly SEARCH: ZodType = z.object({
        name: z.string().min(1).optional(),
        phone: z.string().min(1).optional(),
        email: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive(),
    })
}
