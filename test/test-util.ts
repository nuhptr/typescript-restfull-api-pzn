import bcrypt from "bcrypt"
import { Address, Contact, User } from "@prisma/client"

import { prismaClient } from "@/application/database"

//* UserTest class
export class UserTest {
    static async delete() {
        // using deleteMany whatever data exist or not it still running delete
        await prismaClient.user.deleteMany({
            where: { username: "test" },
        })
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bcrypt.hash("test", 10),
                token: "test",
            },
        })
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: { username: "test" },
        })

        if (!user) {
            throw new Error("User not found.")
        }

        return user
    }
}

//* ContactTest class
export class ContactTest {
    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: { username: "test" },
        })
    }

    static async create() {
        await prismaClient.contact.create({
            data: {
                first_name: "test",
                last_name: "test",
                email: "test@example.com",
                phone: "0899999",
                username: "test",
            },
        })
    }

    static async get(): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where: { username: "test" },
        })

        if (!contact) throw new Error("Contact not found.")

        return contact
    }
}

//* AddressTest class
export class AddressTest {
    static async deleteAll() {
        await prismaClient.address.deleteMany({
            where: {
                contact: {
                    username: "test",
                },
            },
        })
    }

    static async create() {
        const contact = await ContactTest.get()
        await prismaClient.address.create({
            data: {
                contact_id: contact.id,
                street: "Jl. Test",
                city: "Jakarta",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "12345",
            },
        })
    }

    static async get(): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                contact: { username: "test" },
            },
        })

        if (!address) throw new Error("Address not found.")

        return address
    }
}
