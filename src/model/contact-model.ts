import { Contact } from "@prisma/client"

/**
 * Public API response payload for a contact.
 */
export type ContactResponse = {
    id: number
    first_name: string
    last_name?: string | null
    email?: string | null
    phone?: string | null
}

/**
 * Payload used when creating a new contact.
 */
export type CreateContactRequest = {
    first_name: string
    last_name?: string
    email?: string
    phone?: string
}

/**
 * Payload used when updating an existing contact.
 */
export type UpdateContactRequest = {
    id: number
    first_name: string
    last_name?: string
    email?: string
    phone?: string
}

/**
 * Query parameters used for searching contacts by name, email, and phone.
 */
export type SearchContactRequest = {
    name?: string
    phone?: string
    email?: string
    page: number
    size: number
}

/**
 * Maps a Prisma Contact model into the API-safe response format.
 *
 * @param contact Prisma contact entity from the database.
 * @returns Contact data formatted for client responses.
 */
export function toContactResponse(contact: Contact): ContactResponse {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
    }
}
