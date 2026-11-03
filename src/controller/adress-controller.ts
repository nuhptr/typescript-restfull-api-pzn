import { Response, NextFunction } from "express"

import { UserRequest } from "../type/user-request"
import {
    CreateAdressRequest,
    GetAddressRequest,
    RemoveAddressRequest,
    updateAddressRequest,
} from "../model/address-model"
import { AddressService } from "../services/address-service"

export class AdressController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateAdressRequest = req.body as CreateAdressRequest
            request.contact_id = Number(req.params.contactId)

            const response = await AddressService.create(req.user!, request)
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: GetAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            }

            const response = await AddressService.get(req.user!, request)
            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: updateAddressRequest = req.body as updateAddressRequest
            request.contact_id = Number(req.params.contactId)
            request.id = Number(req.params.addressId)

            const response = await AddressService.update(req.user!, request)
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: RemoveAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            }

            await AddressService.remove(req.user!, request)
            res.status(200).json({ data: "OK" })
        } catch (error) {
            next(error)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)
            const response = await AddressService.list(req.user!, contactId)
            res.status(200).json({ data: response })
        } catch (error) {
            next(error)
        }
    }
}
