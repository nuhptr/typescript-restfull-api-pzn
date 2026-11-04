import { web } from "@/src/application/web"
import { logger } from "@/src/application/logging"

/**
 * Application entry point.
 * Starts the Express server and logs a message once the HTTP listener is ready.
 */
web.listen(3000, function () {
    logger.info(`Listening on port 3000`)
})
