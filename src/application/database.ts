import { PrismaClient } from "@prisma/client"
import { logger } from "./logging"

/**
 * Shared Prisma client instance used across the application.
 *
 * This singleton keeps database access centralized and enables
 * Prisma event logging so SQL queries and runtime notices can be
 * tracked through the application's logger.
 */
export const prismaClient = new PrismaClient({
   log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "info" },
      { emit: "event", level: "warn" },
      { emit: "event", level: "error" },
   ],
})

/**
 * Forward Prisma error events to the app logger for troubleshooting.
 */
prismaClient.$on("error", (event) => {
   logger.error(event)
})

/**
 * Forward Prisma warning events to the app logger.
 */
prismaClient.$on("warn", (event) => {
   logger.warn(event)
})

/**
 * Log executed SQL queries so application debugging can inspect
 * database activity in the service logs.
 */
prismaClient.$on("query", (event) => {
   logger.info(event)
})

/**
 * Log general Prisma informational events for operational visibility.
 */
prismaClient.$on("info", (event) => {
   logger.info(event)
})
