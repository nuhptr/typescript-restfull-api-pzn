import { Response, NextFunction } from "express"

import { UserRequest } from "@/src/type/user-request"
import {
   CreateAdressRequest,
   GetAddressRequest,
   RemoveAddressRequest,
   updateAddressRequest,
} from "@/src/model/address-model"
import { AddressService } from "@/src/services/address-service"

/**
 * Handles all HTTP operations for contact addresses.
 *
 * Each method converts the incoming Express request into a typed address
 * request, calls the corresponding service method, and responds with the
 * result in a consistent JSON payload. Any errors are forwarded to the
 * shared error middleware for centralized handling.
 */
export class AdressController {
   /**
    * Creates a new address linked to the contact in the URL.
    */
   static async create(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: CreateAdressRequest = req.body as CreateAdressRequest
         request.contact_id = Number(req.params.contactId)

         const response = await AddressService.create(req.user!, request)
         res.status(200).json({ data: response })
      } catch (error) {
         next(error)
      }
   }

   /**
    * Retrieves a specific address by id for the given contact.
    */
   static async get(req: UserRequest, res: Response, next: NextFunction) {
      try {
         const request: GetAddressRequest = {
            id: Number(req.params.addressId),
            contact_id: Number(req.params.contactId),
         }

         const response = await AddressService.get(req.user!, request)
         res.status(200).json({ data: response })
      } catch (error) {
         next(error)
      }
   }

   /**
    * Updates the selected address with the submitted payload.
    */
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

   /**
    * Removes an address associated with the contact identified in the route.
    */
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

   /**
    * Lists all addresses belonging to a contact.
    */
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
