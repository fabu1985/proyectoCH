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

const input = document.querySelector('#inputText');
const mensajesDiv = document.querySelector('#mensajes');

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
})