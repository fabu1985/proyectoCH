const { Router } = require('express');
const { fork } = require('node:child_process')
const { sendMail } = require('../../utils/sendMail')
const { sendSms } = require('../../utils/sendSms')

const router = Router();

function operacionCompleja(){
  let result = 0
  for (let i = 0; i < 7e9; i++) {
    result  += i
  }
  return result
}

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
})

module.exports = router