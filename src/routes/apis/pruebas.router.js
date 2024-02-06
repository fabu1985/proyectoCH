const { Router } = require('express');
const { fork } = require('node:child_process')
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

module.exports = router