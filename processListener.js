process.on('exit', code => {
    console.log('evento q se ejecuta antes de salir del proceso: '), code
})
process.on('uncaughtException', exception => {
    console.log('captura los errores no controlados, algo mal escrito o undefined', exception)
})

console.log('ejecutando algo')
