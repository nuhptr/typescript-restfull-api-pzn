import { web } from "./application/web"
import { logger } from "./application/logging"

web.listen(3000, function () {
    logger.info(`Listening on port 3000`)
})
