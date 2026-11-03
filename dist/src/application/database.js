"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const logging_1 = require("./logging");
exports.prismaClient = new client_1.PrismaClient({
    log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
    ],
});
// send to winston logger
exports.prismaClient.$on("error", (event) => {
    logging_1.logger.error(event);
});
exports.prismaClient.$on("warn", (event) => {
    logging_1.logger.warn(event);
});
exports.prismaClient.$on("query", (event) => {
    logging_1.logger.info(event);
});
exports.prismaClient.$on("info", (event) => {
    logging_1.logger.info(event);
});
