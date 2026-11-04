import { Address, User } from "@prisma/client"

import { prismaClient } from "@/src/application/database"
import { ContactService } from "@/src/services/contact-service"
import {
    AddressResponse,
    CreateAdressRequest,
    GetAddressRequest,
    RemoveAddressRequest,
    toAddressResponse,
    updateAddressRequest,
} from "@/src/model/address-model"
import { Validation } from "@/src/validation/validation"
import { AddressValidation } from "@/src/validation/address-validation"
import { ResponseError } from "@/src/error/response-error"

export class AddressService {
    /**
     * Creates a new address for a contact owned by the authenticated user.
     *
     * @param user The currently logged-in user.
     * @param request Address creation payload.
     * @returns The created address in API response format.
     */
    static async create(user: User, request: CreateAdressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)

        const address = await prismaClient.address.create({
            data: createRequest as any,
        })

        return toAddressResponse(address)
    }

    /**
     * Checks whether an address exists for the given contact.
     *
     * @param contactId The parent contact id.
     * @param addressId The address id to find.
     * @returns The matching address record.
     * @throws ResponseError If the address does not exist.
     */
    static async checkAddressMustExist(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: { id: addressId, contact_id: contactId },
        })

        if (!address) throw new ResponseError(404, "Address is not found")

        return address
    }

    /**
     * Retrieves a single address by contact and address id.
     *
     * @param user The authenticated user.
     * @param request Address lookup payload.
     * @returns The requested address response.
     */
    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = Validation.validate(AddressValidation.GET, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)

        const address = await this.checkAddressMustExist(getRequest.contact_id, getRequest.id)

        if (!address) throw new ResponseError(404, "Address not found")

        return toAddressResponse(address)
    }

    /**
     * Updates an address that belongs to the given contact.
     *
     * @param user The authenticated user.
     * @param request Updated address payload.
     * @returns The updated address response.
     */
    static async update(user: User, request: updateAddressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.UPDATE, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)

        await this.checkAddressMustExist(updateRequest.contact_id, updateRequest.id)

        const address = await prismaClient.address.update({
            where: { id: updateRequest.id, contact_id: updateRequest.contact_id },
            data: updateRequest,
        })

        return toAddressResponse(address)
    }

    /**
     * Removes an address from a contact.
     *
     * @param user The authenticated user.
     * @param request Request payload containing the contact and address id.
     * @returns The deleted address response.
     */
    static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
        const removeRequest = Validation.validate(AddressValidation.REMOVE, request)
        await ContactService.checkContactMustExist(user.username, request.contact_id)

        const checkAddress = await this.checkAddressMustExist(
            removeRequest.contact_id,
            removeRequest.id,
        )

        if (!checkAddress) throw new ResponseError(404, "Address not found")

        const address = await prismaClient.address.delete({
            where: { id: removeRequest.id },
        })

        return toAddressResponse(address)
    }

    /**
     * Lists all addresses attached to a contact.
     *
     * @param user The authenticated user.
     * @param contactId The contact id whose addresses will be listed.
     * @returns A list of address responses for the contact.
     */
    static async list(user: User, contactId: number): Promise<Array<AddressResponse>> {
        await ContactService.checkContactMustExist(user.username, contactId)

        const addresses = await prismaClient.address.findMany({
            where: { contact_id: contactId },
        })

        return addresses.map((address) => toAddressResponse(address))
    }
}
