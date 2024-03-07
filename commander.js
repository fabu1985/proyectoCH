const { Command } = require('commander')
const { logger } = require('./src/utils/logger')


const program = new Command()

program
    .option('-d', 'Variable para debug')
    .option('-p, <port>', 'puerto del servidor', 4000)
    .option('-u <user>', 'usuario del proceso')
    .option('-l, --letter [letter...]', 'specify letter')

    program.parse()

    logger.info('option: ',program.opts())
    logger.info('ARgument: ',program.args)
