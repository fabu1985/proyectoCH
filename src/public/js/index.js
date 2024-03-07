//console.log('bienvenido al script de index');

const { logger } = require("../../utils/logger");

const socket = io();

socket.emit('recibirMensajeClienteInventoYo', 'estoy usando socket y soy el cliente')

socket.on('enviar-mensajes-cliente', data => {
    logger.info(data)
});

let user
let chatBox = document.querySelector('#chatBox')

// muestra la modal 
Swal.fire({
    title: 'Identificate',
    //icon: 'success',
    input: 'text',
    text: 'Ingrese el usuario para identificarse',
    allowOutsideClick: false,
    inputValidator: value => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar'
    }
    //porque es una promesa va el then y muestra el valor retorna el valor q ingreso
}).then(result => {
    user = result.value
    //console.log(user)
});

// traemos el input del index.hbs  <input id="chatBox" type="text" name="chatBox"> y le agrego un evento

chatBox.addEventListener('keyup', evt => {
    if (evt.key == 'Enter') {
        if (chatBox.value.trim().length > 0){
            socket.emit('message', {user, message: chatBox.value})
            chatBox.value = ''
        }
    }
});

socket.on('messageLogs', data => {
    let messageLogs = document.querySelector('#messageLogs')
    let messages = ''
    data.forEach(elementMensajes => {
        messages += `
        ${elementMensajes.user} dice: ${elementMensajes.message}<br>
        `
    });
    messageLogs.innerHTML = messages;
});