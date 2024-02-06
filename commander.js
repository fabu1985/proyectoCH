const { Command } = require('commander')


const program = new Command()

program
    .option('-d', 'Variable para debug')
    .option('-p, <port>', 'puerto del servidor', 4000)
    .option('-u <user>', 'usuario del proceso')
    .option('-l, --letter [letter...]', 'specify letter')

    program.parse()

    console.log('option: ',program.opts())
    console.log('ARgument: ',program.args)
