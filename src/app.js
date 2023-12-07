const express = require('express');
const handlebars = require ('express-handlebars');
const productsRouter = require('./routes/products.router.js');
const carritoRouter = require('./routes/carts.router.js');

const app = express();
const PORT = 4040;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

//configuracion de handlebars (motor de plantilla HANDLEBARS)
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/views', (req, res) => {
  res.render('index', {
    title: 'Mercadito Fabu',
    name: "Fabiana Diaz Posleman"
  })
})

app.use('/api/products', productsRouter);
app.use('/api/carts', carritoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});
