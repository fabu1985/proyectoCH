const { connect } = require('mongoose')
const { logger } = require('./logger')

class MongoSingleton {
    static instance
    constructor(url){
        connect(url)

    }

    static getInstance (url) {
        if(this.instance){
            logger.info('ya conectado a la bd')
            return this.instance
        }

        this.instance = new MongoSingleton(url)
        logger.info('conectado')
        return this.instance
    }
}

    module.exports = {
        MongoSingleton
    }
