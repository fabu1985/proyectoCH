const { Router } = require('express');
const { fork } = require('node:child_process')
const { sendMail } = require('../../utils/sendMail')
const { sendSms } = require('../../utils/sendSms')
const { faker } = require('@faker-js/faker')
const compression = require('express-compression')

const router = Router();

router.use(compression({
    brotli: {
      enabled: true,
      zlib: {}
  }
}))

router.get('/string', (req, res) => {
  let string = 'holiiissss'

for (let i = 0; i < 5e4; i++) {
  string += 'hola coders'
}

  res.send(string)
})
/*
const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.string.numeric(),
    description: faker.commerce.productDescription(),
    id: faker.database.mongodbObjectId(),
    image: faker.image.url(),
  }
}

const generateUser = () => {
  let products = []
  let totalOfProducts = parseInt(faker.string.numeric(1, {bannerDigits: ['0']}))
  for (let i = 0; i < totalOfProducts; i++) {
    products.push(generateProduct())
  }

  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    gender: faker.person.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    image: faker.image.avatar(),
    id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    products
  }
}

router.get('/mockingproducts', (req, res) => {
  let users = []

for (let i = 0; i < 100; i++) {
  users.push(generateUser())
}

  res.send({
    status: 'success',
    payload: users
  })
})

router.get('/block', (req, res) => {
  const result = operacionCompleja()
  res.send(`el resultado es: ${result}`)
})

router.get('/noblock', (req, res) => {
  const child = fork('./src/routes/operacioncompleja.js')
  child.send('inicia el calculo plis')
  child.on('message', data => {
    res.send(`el resultado es: ${data}`)
  })
})

router.get('/sendsms', (req, res) => {
  sendSms(`Bienvenido`, {first_name: 'Fabiana', last_name: 'Test SMS', phone: '+5493814406739'})
  res.send('SMS enviado')
})

router.get('/sendmail', (req, res) => {
  const user = {
    email: 'fabutacatest@gmail.com',
    first_name: 'Fabiana',
    last_name: 'Test'
}
// llamar una función enviar el mail
const to      = user.email
const subject = 'Esto es un mail de prueba'
const html    = `<div>
    <h2>Bienvenido a prueba de email ${user.first_name} ${user.last_name}</h2>
</div>` 
sendMail(to, subject, html)
    res.send('mail enviado')
})*/

module.exports = router