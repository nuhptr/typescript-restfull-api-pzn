"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
const adress_controller_1 = require("../controller/adress-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// TODO: Users API
exports.apiRouter.get("/api/users/current", user_controller_1.UserController.get);
exports.apiRouter.patch("/api/users/current", user_controller_1.UserController.update);
exports.apiRouter.delete("/api/users/current", user_controller_1.UserController.logout);
// TODO: Contacts API
exports.apiRouter.post("/api/contacts", contact_controller_1.ContactController.create);
// :contactId(\\d+) is a regex to ensure contactId is a number
exports.apiRouter.get("/api/contacts/:contactId(\\d+)", contact_controller_1.ContactController.get);
exports.apiRouter.put("/api/contacts/:contactId(\\d+)", contact_controller_1.ContactController.update);
exports.apiRouter.delete("/api/contacts/:contactId(\\d+)", contact_controller_1.ContactController.remove);
exports.apiRouter.get("/api/contacts", contact_controller_1.ContactController.search);
// TODO: Address API
exports.apiRouter.post("/api/contacts/:contactId(\\d+)/addresses", adress_controller_1.AdressController.create);
exports.apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", adress_controller_1.AdressController.get);
exports.apiRouter.put("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", adress_controller_1.AdressController.update);
exports.apiRouter.delete("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", adress_controller_1.AdressController.remove);
exports.apiRouter.get("/api/contacts/:contactId(\\d+)/addresses", adress_controller_1.AdressController.list);
