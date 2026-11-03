import supertest from "supertest"

import { web } from "@/application/web"
import { logger } from "@/application/logging"

import { ContactTest, UserTest } from "./test-util"

// POST /api/contacts (private api) => DONE TEST ✅
describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("should create new contact", async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "John",
                last_name: "Doe",
                email: "jhondoe@example.com",
                phone: "081234567890",
            })

        logger.debug(response.body)
        expect(response.status).toBe(201)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe("John")
        expect(response.body.data.last_name).toBe("Doe")
        expect(response.body.data.email).toBe("jhondoe@example.com")
        expect(response.body.data.phone).toBe("081234567890")
    })

    it("should reject create new contact if data is invalid", async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "jhondoe",
                phone: "081234567890123213",
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

// GET /api/contacts/:contactId (private api) => DONE TEST ✅
describe("GET /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
        await ContactTest.deleteAll()
    })

    it("should be able get contact", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    })

    it("should reject get contact if contact is not found", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

// PUT /api/contacts/:contactId (private api) => DONE TEST ✅
describe("PUT /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
        await ContactTest.deleteAll()
    })

    it("should be able update contact", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "John",
                last_name: "Doe",
                email: "jhondoe@example.com",
                phone: "081234567890",
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(contact.id)
        expect(response.body.data.first_name).toBe("John")
        expect(response.body.data.last_name).toBe("Doe")
        expect(response.body.data.email).toBe("jhondoe@example.com")
        expect(response.body.data.phone).toBe("081234567890")
    })

    it("should reject update contact if request is invalid", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: "",
                last_name: "",
                email: "jhondoe",
                phone: "",
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

// DELETE /api/contacts/:contactId (private api) => DONE TEST ✅
describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(async function () {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async function () {
        await UserTest.delete()
        await ContactTest.deleteAll()
    })

    it("should be able remove contact", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })

    it("should reject remove contact if contact is not found", async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

// GET /api/contacts for search by name / email / phone (private api) => DONE TEST ✅
describe("GET /api/contacts", () => {
    beforeEach(async function () {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async function () {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it("Should be able to search contact", async () => {
        const response = await supertest(web).get("/api/contacts").set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it("Should be able to search contact using name", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({ name: "tes" })
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it("Should be able to search contact using email", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({ email: ".com" })
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it("Should be able to search contact using phone", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({ phone: "9999" })
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })

    it("Should be able to search contact no result", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({ name: "salah" })
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0) // No result
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(0) // No result
        expect(response.body.paging.size).toBe(10)
    })

    it("Should be able to search contact with paging", async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .query({ page: 2, size: 1 })
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(0) // data is empty
        expect(response.body.paging.current_page).toBe(2)
        expect(response.body.paging.total_page).toBe(1) // total 1 page
        expect(response.body.paging.size).toBe(1) // 1 data per page
    })
})
