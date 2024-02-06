const { connect } = require('mongoose')

class MongoSingleton {
    static instance
    constructor(url){
        connect(url)

    }

    static getInstance (url) {
        if(this.instance){
            console.log('ya conectado a la bd boluuuuuuuuu')
            return this.instance
        }

        this.instance = new MongoSingleton(url)
        console.log('conectadooooooooooo')
        return this.instance
    }
}

    module.exports = {
        MongoSingleton
    }
