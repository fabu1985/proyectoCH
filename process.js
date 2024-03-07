const { logger } = require("./src/utils/logger")

logger.info(process.cwd())
logger.info(process.pid)
logger.info(process.memoryUsage())
logger.info(process.version)
logger.info('arg:',process.argv)

logger.info(process.argv.slice(2))

