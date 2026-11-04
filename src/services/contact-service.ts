import { Contact, User } from "@prisma/client"

import { prismaClient } from "@/src/application/database"
import {
    ContactResponse,
    toContactResponse,
    CreateContactRequest,
    UpdateContactRequest,
    SearchContactRequest,
} from "@/src/model/contact-model"
import { Pageable } from "@/src/model/page"

import { ContactValidation } from "@/src/validation/contact-validation"
import { Validation } from "@/src/validation/validation"
import { ResponseError } from "@/src/error/response-error"

export class ContactService {
    /**
     * Creates a new contact for the authenticated user.
     *
     * @param user The currently logged-in user.
     * @param request Contact payload received from the client.
     * @returns The created contact mapped to the response model.
     */
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request)

        const record = { ...{ username: user.username }, ...createRequest }

        const contact = await prismaClient.contact.create({
            data: record,
        })

        return toContactResponse(contact)
    }

    /**
     * Validates that a contact exists and belongs to the current user.
     *
     * @param username The authenticated username.
     * @param contactId The contact identifier to check.
     * @returns The matching contact record.
     * @throws ResponseError if the contact is not found.
     */
    static async checkContactMustExist(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: { id: contactId, username: username },
        })

        if (!contact) throw new ResponseError(404, "Contact not found")

        return contact
    }

    /**
     * Retrieves a contact by id for the authenticated user.
     *
     * @param user The currently logged-in user.
     * @param id The contact id to fetch.
     * @returns The contact details in response format.
     */
    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExist(user.username, id)
        return toContactResponse(contact)
    }

    /**
     * Updates an existing contact after validating input and ownership.
     *
     * @param user The authenticated user.
     * @param request The updated contact payload.
     * @returns The updated contact mapped to the response model.
     */
    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request)
        await this.checkContactMustExist(user.username, updateRequest.id)

        const contact = await prismaClient.contact.update({
            where: { id: updateRequest.id, username: user.username },
            data: updateRequest,
        })

        return toContactResponse(contact)
    }

    /**
     * Removes a contact owned by the authenticated user.
     *
     * @param user The authenticated user.
     * @param id The contact id to remove.
     * @returns The deleted contact in response format.
     */
    static async remove(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExist(user.username, id)
        await prismaClient.contact.delete({
            where: { id: id, username: user.username },
        })

        return toContactResponse(contact)
    }

    /**
     * Searches contacts for the authenticated user using optional filter parameters.
     *
     * @param user The authenticated user.
     * @param request Search criteria and pagination configuration.
     * @returns A paginated list of contact responses.
     */
    static async search(
        user: User,
        request: SearchContactRequest,
    ): Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate<SearchContactRequest>(
            ContactValidation.SEARCH,
            request,
        )
        const skip = (searchRequest.page - 1) * searchRequest.size // 0 * 10 = 0, 1 * 10 = 10

        const filters = []

        /**
         * Filters by first name or last name when a name query is supplied.
         */
        if (searchRequest.name) {
            filters.push({
                OR: [
                    { first_name: { contains: searchRequest.name } },
                    { last_name: { contains: searchRequest.name } },
                ],
            })
        }

        /**
         * Filters by email substring when provided.
         */
        if (searchRequest.email) {
            filters.push({
                email: { contains: searchRequest.email },
            })
        }

        /**
         * Filters by phone substring when provided.
         */
        if (searchRequest.phone) {
            filters.push({
                phone: { contains: searchRequest.phone },
            })
        }

        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters,
            },
            take: searchRequest.size,
            skip: skip,
        })

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters,
            },
        })

        return {
            data: contacts.map((contact) => toContactResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size), // ceil: 1.5 => 2
                size: searchRequest.size,
            },
        }
    }
}
