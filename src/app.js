const express = require('express');
const multer = require('multer');
const handlebars = require ('express-handlebars');
const productsRouter = require('./routes/apis/products.router.js');
const carritoRouter = require('./routes/apis/carts.router.js');
const viewsRouter = require('./routes/views.router.js');
const userRouter = require('./routes/apis/users.router.js')
const ordersRouter = require('./routes/apis/orders.router.js')
const sessionsRouter = require('./routes/apis/sessions.router.js')
const pruebasRouter = require('./routes/apis/pruebas.router.js')
/////const chatRouter = require('./routes/chat.router.js');
const { uploader } = require('./utils/uploader.js')
const { Server } = require('socket.io');
const { connect } = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const { initializePassport } =  require('./config/passport.config.js');
const { connectDB } = require('./config/index.js');

const app = express();
const PORT = process.env.PORT || 4040;

app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://fabianadiazp:FABU1985@cluster0.qn3ysof.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl: 1500
  }),
  secret: 'secretCoder',
  resave: true, 
  saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(cookieParser('p@l@br@seCret@'));

initializePassport()
app.use(passport.initialize())

app.post('/uploader', uploader.single('myFile'), (req,res)=>{
  res.send('Imagen subida')
});


///estrategia de session con mongo
const fileStore = new FileStore(session);

//configuracion de handlebars (motor de plantilla HANDLEBARS)
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
connectDB()

////app.set('chat', __dirname + '/chat');

app.use('/api/products', productsRouter);
app.use('/api/pruebas', pruebasRouter);
app.use('/api/carts', carritoRouter);
app.use('/api/users', userRouter)
////app.use('/chat', chatRouter);
app.use('/views', viewsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/sessions', sessionsRouter);

app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('error de server')
});

//server express http
const serverHttp = app.listen(PORT,err => {
  if (err) console.log(err)
  console.log(`Server is running on http://localhost:${PORT}`)
});

// server socket
const io = new Server(serverHttp);

let messagesArray = []

io.on('connection', socket => {
  console.log('nuevo cliente conectado');

  socket.on('message', data => {
    messagesArray.push(data);
    io.emit('messageLogs', messagesArray)
  });
});
