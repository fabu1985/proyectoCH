const mongoose = require('mongoose')
const Users = require('../src/dao/mongo/usersDaoMongo')
const chai = require('chai')

mongoose.connect('mongodb+srv://fabianadiazp:FABU1985@cluster0.qn3ysof.mongodb.net/ecommerce?retryWrites=true&w=majority')
const expect = chai.expect

describe('primer test de user dao', () => {
    beforeEach(function () {
        this.userDao = new Users()
    })
    before(function () {
        this.timeout(2000)
    })

    it('debe traerme una array', async function(){
        const response = await this.userDao.get();
        expect(response).not.to.be.equal([]);
    })
})