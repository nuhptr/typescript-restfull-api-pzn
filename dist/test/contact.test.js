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
const web_1 = require("@/application/web");
const logging_1 = require("@/application/logging");
const test_util_1 = require("./test-util");
// POST /api/contacts (private api) => DONE TEST ✅
describe("POST /api/contacts", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ContactTest.deleteAll();
        yield test_util_1.UserTest.delete();
    }));
    it("should create new contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "John",
            last_name: "Doe",
            email: "jhondoe@example.com",
            phone: "081234567890",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("John");
        expect(response.body.data.last_name).toBe("Doe");
        expect(response.body.data.email).toBe("jhondoe@example.com");
        expect(response.body.data.phone).toBe("081234567890");
    }));
    it("should reject create new contact if data is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "",
            last_name: "",
            email: "jhondoe",
            phone: "081234567890123213",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
});
// GET /api/contacts/:contactId (private api) => DONE TEST ✅
describe("GET /api/contacts/:contactId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
        yield test_util_1.ContactTest.deleteAll();
    }));
    it("should be able get contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    }));
    it("should reject get contact if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
// PUT /api/contacts/:contactId (private api) => DONE TEST ✅
describe("PUT /api/contacts/:contactId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ContactTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.delete();
        yield test_util_1.ContactTest.deleteAll();
    }));
    it("should be able update contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "John",
            last_name: "Doe",
            email: "jhondoe@example.com",
            phone: "081234567890",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id);
        expect(response.body.data.first_name).toBe("John");
        expect(response.body.data.last_name).toBe("Doe");
        expect(response.body.data.email).toBe("jhondoe@example.com");
        expect(response.body.data.phone).toBe("081234567890");
    }));
    it("should reject update contact if request is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            first_name: "",
            last_name: "",
            email: "jhondoe",
            phone: "",
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
});
// DELETE /api/contacts/:contactId (private api) => DONE TEST ✅
describe("DELETE /api/contacts/:contactId", () => {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield test_util_1.UserTest.create();
            yield test_util_1.ContactTest.create();
        });
    });
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield test_util_1.UserTest.delete();
            yield test_util_1.ContactTest.deleteAll();
        });
    });
    it("should be able remove contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    }));
    it("should reject remove contact if contact is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const contact = yield test_util_1.ContactTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
// GET /api/contacts for search by name / email / phone (private api) => DONE TEST ✅
describe("GET /api/contacts", () => {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield test_util_1.UserTest.create();
            yield test_util_1.ContactTest.create();
        });
    });
    afterEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield test_util_1.ContactTest.deleteAll();
            yield test_util_1.UserTest.delete();
        });
    });
    it("Should be able to search contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web).get("/api/contacts").set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("Should be able to search contact using name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts")
            .query({ name: "tes" })
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("Should be able to search contact using email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts")
            .query({ email: ".com" })
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("Should be able to search contact using phone", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts")
            .query({ phone: "9999" })
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
    it("Should be able to search contact no result", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts")
            .query({ name: "salah" })
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0); // No result
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0); // No result
        expect(response.body.paging.size).toBe(10);
    }));
    it("Should be able to search contact with paging", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/contacts")
            .query({ page: 2, size: 1 })
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0); // data is empty
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1); // total 1 page
        expect(response.body.paging.size).toBe(1); // 1 data per page
    }));
});
