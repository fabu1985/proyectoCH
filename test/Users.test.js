const mongoose = require('mongoose')
const Users = require('../src/dao/mongo/usersDaoMongo')
const Assert = require('node:assert')

mongoose.connect('mongodb+srv://fabianadiazp:FABU1985@cluster0.qn3ysof.mongodb.net/ecommerce?retryWrites=true&w=majority')
const assert = Assert.strict

describe('primer test de user dao', () => {
    before(function () {
        this.userDao = new Users()
    })
    before(function () {
        this.timeout(5000)
    })

    it('debe traerme una array', async function (){
        const response = await this.userDao.get();
        assert.strictEqual(Array.isArray(response), true);
    })
})