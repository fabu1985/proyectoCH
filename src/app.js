const express = require('express');
const handlebars = require ('express-handlebars');
const productsRouter = require('./routes/apis/products.router.js');
const carritoRouter = require('./routes/apis/carts.router.js');
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

app.use('/api/products', productsRouter);
app.use('/api/carts', carritoRouter);
app.use('/views', viewsRouter);

//server express http
const serverHttp = app.listen(PORT,err => {
  if (err) console.log(err)
  console.log(`Server is running on http://localhost:${PORT}`)
});

// server socket
const io = new Server(serverHttp);

let messagesArray = []

io.on('connection', socket => {
  console.log('nuevo cliente conectado lalalala');

  socket.on('message', data => {
    messagesArray.push(data);
    io.emit('messageLogs', messagesArray)
  })
})