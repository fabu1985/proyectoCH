const { logger } = require("./src/utils/logger")

process.on('exit', code => {
    logger.info('evento q se ejecuta antes de salir del proceso: '), code
})
process.on('uncaughtException', exception => {
    logger.info('captura los errores no controlados, algo mal escrito o undefined', exception)
})

logger.info('ejecutando algo')
