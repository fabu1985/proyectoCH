const express = require('express');
const handlebars = require ('express-handlebars');
const productsRouter = require('./routes/apis/products.router.js');
const carritoRouter = require('./routes/apis/carts.router.js');
const userRouter = require('./routes/apis/users.router.js');
const viewsRouter = require('./routes/views.router.js');
const { uploader } = require('./helpers/uploader.js')
const { Server } = require('socket.io');
//IMPORTAR moongose
const { connect } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4040;
//conectar a la bd de mongo
const connectDb = async () => {
  //al invocar, cuando levantos se crea la base de datos sola desde la consola la puedo ver
  await connect('mongodb+srv://fabianadiazp:FABU1985@cluster0.qn3ysof.mongodb.net/ecommerce?retryWrites=true&w=majority');
  console.log('base de datos conectada')
}
connectDb()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

//configuracion de handlebars (motor de plantilla HANDLEBARS)
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

/*se va a views.router
app.get('/views', (req, res) => {
  res.render('index', {
    title: 'Mercadito Fabu',
    name: "Fabiana Diaz Posleman"
  })
})*/

app.use('/api/products', productsRouter);
app.use('/api/carts', carritoRouter);
app.use('/api/users', userRouter);
app.use('/views', viewsRouter);

//server express http
const serverHttp = app.listen(PORT,err => {
  if (err) console.log(err)
  console.log(`Server is running on http://localhost:${PORT}`)
});

// server socket
const io = new Server(serverHttp);

/*let arrayMensajes = [];

io.on('connection', socket => {
  console.log('nuevo cliente conectado');
  //socket.on('recibirMensajeClienteInventoYo', data => {
    //console.log(data)
  //});

  // a este lo ven todos
  //socket.emit('solo-para-el-actual', 'este solo lo debe recibir el socket actual')
  //a este lo ven todos menos el actual cuando actualizo esto es para chat por eso uso broadcast
  //socket.broadcast.emit('para-todos-menos-actual', 'este evento lo veran todos los conectados, menos el actual');
  // lo recibben todos
  //io.emit('evento-para-todos', 'este mensaje lo reciben todos incluido el actual');

  socket.emit('enviar-mensajes-cliente', arrayMensajes);
  
  socket.on('message', mensajes => {
    //console.log(mensajes)
    arrayMensajes.push({id: socket.id, message: mensajes});
    io.emit('mensaje-recibido-cliente', arrayMensajes)
  });
});*/

let messagesArray = []

io.on('connection', socket => {
  console.log('nuevo cliente conectado lalalala');

  socket.on('message', data => {
    messagesArray.push(data);
    io.emit('messageLogs', messagesArray)
  })
})