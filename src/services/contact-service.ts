import { Contact, User } from "@prisma/client"

import { prismaClient } from "../application/database"
import {
    ContactResponse,
    toContactResponse,
    CreateContactRequest,
    UpdateContactRequest,
    SearchContactRequest,
} from "../model/contact-model"
import { Pageable } from "../model/page"

import { ContactValidation } from "../validation/contact-validation"
import { Validation } from "../validation/validation"
import { ResponseError } from "../error/response-error"

export class ContactService {
    // TODO: CREATE SERVICE (private api)
    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request)

        const record = {
            ...{ username: user.username },
            ...createRequest,
        }

        const contact = await prismaClient.contact.create({
            data: record,
        })

        return toContactResponse(contact)
    }

    // TODO: REUSABLE FUNCTION
    static async checkContactMustExist(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findUnique({
            where: {
                id: contactId,
                username: username,
            },
        })

        if (!contact) throw new ResponseError(404, "Contact not found")

        return contact
    }

    // TODO: GET SERVICE (private api)
    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExist(user.username, id)
        return toContactResponse(contact)
    }

    // TODO: UPDATE SERVICE (private api)
    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request)
        await this.checkContactMustExist(user.username, updateRequest.id)

        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username,
            },
            data: updateRequest,
        })

        return toContactResponse(contact)
    }

    // TODO: REMOVE SERVICE (private api)
    static async remove(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExist(user.username, id)
        await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username,
            },
        })

        return toContactResponse(contact)
    }

    // TODO: SEARCH SERVICE (private api)
    static async search(
        user: User,
        request: SearchContactRequest
    ): Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate<SearchContactRequest>(
            ContactValidation.SEARCH,
            request
        )
        const skip = (searchRequest.page - 1) * searchRequest.size // 0 * 10 = 0, 1 * 10 = 10

        const filters = []

        //* Check if name (first_name / last_name) exists
        if (searchRequest.name) {
            filters.push({
                OR: [
                    {
                        first_name: {
                            contains: searchRequest.name,
                        },
                    },
                    {
                        last_name: {
                            contains: searchRequest.name,
                        },
                    },
                ],
            })
        }
        //* Check if email exists
        if (searchRequest.email) {
            filters.push({
                email: { contains: searchRequest.email },
            })
        }
        //* check if phone exists
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
                total_page: Math.ceil(total / searchRequest.size), //* ceil: 1.5 => 2
                size: searchRequest.size,
            },
        }
    }
}
