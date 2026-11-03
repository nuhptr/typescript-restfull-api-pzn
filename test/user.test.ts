import supertest from "supertest"
import bcrypt from "bcrypt"

import { web } from "@/application/web"
import { logger } from "@/application/logging"
import { UserTest } from "./test-util"

// Register Test (public api) => DONE TEST ✅
describe("POST /api/users", () => {
    // Clean up database after each test
    afterEach(async () => {
        await UserTest.delete()
    })

    // Failed register because empty request
    it("should reject register new user if request is invalid", async () => {
        const response = await supertest(web).post("/api/users").send({
            name: "",
            username: "",
            password: "",
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    // Success register new user
    it("should register new user", async () => {
        const response = await supertest(web).post("/api/users").send({
            name: "test",
            username: "test",
            password: "test",
        })

        logger.debug(response.body)
        expect(response.status).toBe(201)
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.username).toBe("test")
    })
})

// Login Test (public api) => DONE TEST ✅
describe("POST /api/users/login", () => {
    beforeEach(async () => {
        // create user before start test
        await UserTest.create()
    })

    afterEach(async () => {
        // delete user
        await UserTest.delete()
    })

    // login success
    it("should be able to login", async () => {
        const response = await supertest(web).post("/api/users/login").send({
            username: "test",
            password: "test",
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.token).toBeDefined()
    })

    // login failed because wrong password
    it("should reject login if password is wrong", async () => {
        const response = await supertest(web).post("/api/users/login").send({
            username: "test",
            password: "wrong",
        })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    // login failed because wrong username
    it("should reject login if username is wrong", async () => {
        const response = await supertest(web).post("/api/users/login").send({
            username: "wrong",
            password: "test",
        })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})

// GET USER (private api) => DONE TEST ✅
describe("GET /api/users", () => {
    beforeEach(async () => {
        // create user before start test
        await UserTest.create()
    })

    afterEach(async () => {
        // delete user
        await UserTest.delete()
    })

    it("should get user with using token!", async () => {
        const response = await supertest(web).get("/api/users/current").set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.username).toBe("test")
    })

    it("should reject get user if token is wrong", async () => {
        const response = await supertest(web).get("/api/users/current").set("X-API-TOKEN", "wrong")

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})

// UPDATE USER (private api) => DONE TEST ✅
describe("PATCH /api/users/current", () => {
    beforeEach(async () => {
        // create user before start test
        await UserTest.create()
    })

    afterEach(async () => {
        // delete user
        await UserTest.delete()
    })

    it("should reject update user if request is invalid", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                password: "",
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it("should reject update user if token is wrong.", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
                name: "benar",
                password: "benar",
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it("should be able update user name", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                name: "benar",
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("benar")
    })

    it("should be able update user password", async () => {
        const response = await supertest(web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
                password: "benar",
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)

        const user = await UserTest.get()
        expect(await bcrypt.compare("benar", user.password)).toBe(true)
    })
})

// LOGOUT USER => DONE TEST ✅
describe("DELETE /api/users/current", () => {
    beforeEach(async () => {
        // create user before start test
        await UserTest.create()
    })

    afterEach(async () => {
        // delete user
        await UserTest.delete()
    })

    it("should be able to logout", async () => {
        const response = await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")

        const user = await UserTest.get()
        expect(user.token).toBeNull()
    })

    it("should reject logout if token is wrong", async () => {
        const response = await supertest(web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "wrong")

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})
