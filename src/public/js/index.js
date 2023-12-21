//console.log('bienvenido al script de index');

const socket = io();

socket.emit('recibirMensajeClienteInventoYo', 'estoy usando socket y soy el cliente')


// con esto veo el mensaje en consola
/* socket.on('solo-para-el-actual', dataServer => {
    console.log(dataServer)
});*/


//con esto veo el mensaje en el server que estoy parada y no el que actualizo
/*socket.on('para-todos-menos-actual', dataServer => {
    console.log(dataServer)
});*/

//con esto veo el mensaje inlucido en el actual
/*socket.on('evento-para-todos', dataServer => {
    console.log(dataServer)
});*/

socket.on('enviar-mensajes-cliente', data => {
    console.log(data)
});

//const input = document.querySelector('#inputText');
//const mensajesDiv = document.querySelector('#mensajes');

let user
let chatBox = document.querySelector('#chatBox')
/*
input.addEventListener('keyup', evt => {
    if (evt.key == 'Enter') {
        socket.emit('message', input.value);
        input.value = ""
    }
});

socket.on('mensaje-recibido-cliente', arrayMensajes => {
    //console.log(arrayMensajes);
    let mensajes = '';
    arrayMensajes.forEach(mensaje => {
        mensajes += `<li>${mensaje.id} dice: ${mensaje.message}</li>`
    });
    mensajesDiv.innerHTML = mensajes;
});*/

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