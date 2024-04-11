const supertest = require('supertest')
const chai = require('chai')

const expect = chai.expect
const requester = supertest('http://localhost:8080')
// mongoose.connect('mongodb+srv://fabianadiazp:FABU1985@cluster0.qn3ysof.mongodb.net/ecommerce?retryWrites=true&w=majority')


describe.skip('primer test con super test', () => {
    it('crear usuario', async () => {
        const addUser = {
            "first_name": "eeeooooo3",
            "last_name": "eeeooooo3",
            "email": "eeeooooo3@gmail.com",
            "password": "1234"
        }
        const { statusCode, _body, ok} = await requester.post('/api/users').send(addUser);
        expect(_body.payload).to.have.property('_id')
        console.log(_body)
    })
});

describe('test de session', () => {
    let cookie

    it.skip('el servicio registra un user ok', async () => {
        const userMock = {
            "first_name": "eeeooooo4",
            "last_name": "eeeooooo4",
            "email": "eeeooooo4@gmail.com",
            "password": "1234"
        }
        const { _body } = await requester.post('/api/users/register').send(userMock);
        expect(_body.payload).to.be.ok
        console.log(_body)
    });

    it('el servicio loguea ok y devuelve cookie', async () => {
        let userMock = {
            "email": "fabu@fabu.com",
            "password": "1234"
        }
        const response = await requester.post('/api/users/login').send(userMock);
        console.log(response.headers)
        // expect(_body.payload).to.be.ok
        const cookieResponse = response.header['set-cookie'][0]
        console.log(cookieResponse)
    })
})