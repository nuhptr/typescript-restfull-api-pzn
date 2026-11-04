import { Address } from "@prisma/client"

/**
 * Public API representation of an address returned to clients.
 */
export type AddressResponse = {
    id: number
    street?: string | null
    city?: string | null
    province?: string | null
    country?: string | null
    postal_code: string
}

/**
 * Payload used to create a new address for a contact.
 */
export type CreateAdressRequest = {
    contact_id: number
    street?: string | null
    city?: string | null
    province?: string | null
    country?: string | null
    postal_code: string
}

/**
 * Request payload used to fetch a single address by its id and owning contact.
 */
export type GetAddressRequest = {
    contact_id: number
    id: number
}

/**
 * Payload used to update an existing address.
 */
export type updateAddressRequest = {
    id: number
    contact_id: number
    street?: string
    city?: string
    province?: string
    country: string
    postal_code: string
}

/**
 * Request payload used to remove an address.
 */
export type RemoveAddressRequest = GetAddressRequest

/**
 * Maps a Prisma Address model into the API-safe response shape.
 *
 * @param address Prisma address entity from the database.
 * @returns Serialized address data for clients.
 */
export function toAddressResponse(address: Address): AddressResponse {
    return {
        id: address.id,
        street: address.street,
        city: address.city,
        province: address.province,
        country: address.country,
        postal_code: address.postal_code,
    }
}
