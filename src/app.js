const express = require('express');
const multer = require('multer');
const handlebars = require ('express-handlebars');
const { Server } = require('socket.io');
const { connect } = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const { initializePassport } =  require('./config/passport.config.js');
const { connectDB, configObject } = require('./config/index.js');
const cors = require('cors')
const appRouter = require('./routes/index.js');
const { handleError } = require('./middlewares/error/handleErrors.js');
const { sumaNumeros } = require('proyectosumafabianadiazposleman');
const app = express();
const PORT = configObject.PORT

console.log(sumaNumeros(1,2,3,4,5))
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
app.use(cors());

initializePassport()
app.use(passport.initialize())

app.use(appRouter)
/* 
llamo al handle errors debajo
app.use(( err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('error de server')
});*/
app.use(handleError)

//configuracion de handlebars (motor de plantilla HANDLEBARS)
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
connectDB()



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
