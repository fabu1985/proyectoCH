const { Command } = require('commander')

const program = new Command()

program
    .option('--mode <mode>', 'modo de manejode  entornos', 'production')
    .parse()

    module.exports = {
        program
    }