import { z, ZodType } from "zod"

export class AddressValidation {
    /**
     * Schema for creating a new address entry.
     * Requires a positive contact id and valid country/postal code values.
     */
    static readonly CREATE: ZodType = z.object({
        contact_id: z.number().positive(),
        street: z.string().min(1).max(255).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(10),
    })

    /**
     * Schema for fetching a single address by contact and address id.
     */
    static readonly GET: ZodType = z.object({
        contact_id: z.number().positive(),
        id: z.number().positive(),
    })

    /**
     * Schema for deleting an address by contact and address id.
     */
    static readonly REMOVE: ZodType = z.object({
        contact_id: z.number().positive(),
        id: z.number().positive(),
    })

    /**
     * Schema for updating an existing address.
     * Requires a valid address id and the same positive contact ownership reference.
     */
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        contact_id: z.number().positive(),
        street: z.string().min(1).max(255).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(10),
    })
}
