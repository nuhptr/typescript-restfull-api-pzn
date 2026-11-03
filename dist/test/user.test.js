"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const web_1 = require("@/application/web");
const logging_1 = require("@/application/logging");
const test_util_1 = require("./test-util");
// Register Test (public api) => DONE TEST ✅
describe("POST /api/users", () => {
    // Clean up database after each test
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
    }));
    // Failed register because empty request
    it("should reject register new user if request is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users").send({
            name: "",
            username: "",
            password: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    // Success register new user
    it("should register new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users").send({
            name: "test",
            username: "test",
            password: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.username).toBe("test");
    }));
});
// Login Test (public api) => DONE TEST ✅
describe("POST /api/users/login", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // create user before start test
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // delete user
        yield test_util_1.UserTest.delete();
    }));
    // login success
    it("should be able to login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users/login").send({
            username: "test",
            password: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.token).toBeDefined();
    }));
    // login failed because wrong password
    it("should reject login if password is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users/login").send({
            username: "test",
            password: "wrong",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
    // login failed because wrong username
    it("should reject login if username is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).post("/api/users/login").send({
            username: "wrong",
            password: "test",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
// GET USER (private api) => DONE TEST ✅
describe("GET /api/users", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // create user before start test
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // delete user
        yield test_util_1.UserTest.delete();
    }));
    it("should get user with using token!", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).get("/api/users/current").set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.username).toBe("test");
    }));
    it("should reject get user if token is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).get("/api/users/current").set("X-API-TOKEN", "wrong");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
// UPDATE USER (private api) => DONE TEST ✅
describe("PATCH /api/users/current", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // create user before start test
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // delete user
        yield test_util_1.UserTest.delete();
    }));
    it("should reject update user if request is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
            name: "",
            password: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
    it("should reject update user if token is wrong.", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "salah")
            .send({
            name: "benar",
            password: "benar",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
    it("should be able update user name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
            name: "benar",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("benar");
    }));
    it("should be able update user password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .patch("/api/users/current")
            .set("X-API-TOKEN", "test")
            .send({
            password: "benar",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        const user = yield test_util_1.UserTest.get();
        expect(yield bcrypt_1.default.compare("benar", user.password)).toBe(true);
    }));
});
// LOGOUT USER => DONE TEST ✅
describe("DELETE /api/users/current", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // create user before start test
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // delete user
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
        const user = yield test_util_1.UserTest.get();
        expect(user.token).toBeNull();
    }));
    it("should reject logout if token is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete("/api/users/current")
            .set("X-API-TOKEN", "wrong");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    }));
});
