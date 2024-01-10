/* const { Router } = require('express')
const router = Router();

router.get('/setcookies', (req, res) => {
    res.cookie('coderCookie', 'esta es una cookie muy poderosa', {maxAge: 10000}).send('cookies')
  });

  router.get('/getcookies', (req, res) => {
    res.send('cookies')
  });

  router.get('/deletecookies', (req, res) => {
    res.send('cookies')
  });

module.exports = router; */

const {Router } = require('express');
const { authentication } = require('../../middlewares/auth.middleware');
const { usersModel } = require('../../dao/mongo/models/ecommerce.model');

const router = Router();


router.get('/', (req, res)=>{
    if (req.session.counter) {
        req.session.counter ++

        res.send(`Se ha visatado esta página ${req.session.counter}`)
    }else{
        req.session.counter = 1
        req.session.firts_name = 'fede' 
        res.send('Bienvenido a sessions')
    }
    // res.send('sessions')
});

router.post('/register', async (req, res)=>{
  const { first_name, last_name, email , password } = req.body
  

  if (first_name ==='' || password === "" || email === '' ) {
      return res.send('completar datos requeridos')
  }

  const userFound = await usersModel.findOne({email})
  if (userFound) {
      return res.send({status: 'error', error: 'existant user'})
  }
  const newUser = {
      first_name,
      last_name,
      email,
      password
  }
  const result = await usersModel.create(newUser)
  
  res.send({
      status: 'success',
      payload: {
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          _id: result._id
      }
  })
});

router.post('/login', async (req, res)=>{
  const {email , password } = req.body
  // simulando consulta a la base de datos
  if (email === '' || password === '') {
      return res.send('todos los campos son obligatoris')
  }
  
  const user = await usersModel.findOne({email})
  if (!user) {
      return res.send('email inexistente')
  }

  // validar si es el password
  if (password !== user.password) {
      return res.send('contraseña erronea')
  }

  req.session.user = {
      user: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      admin: true
  }
  res.redirect('/')
});


router.get('/current', authentication, (req, res) => {
    res.send('info sensible que solo puede ver el admin')
});

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) return res.send({status: 'error', error: err})
    })
    res.send('logout exitoso')
});

// cookies
router.get('/setcookies', (req, res) => {
    // cookie par key value 
    res.cookie('signedCookie', 'Esta es una cookie muy poderosa.', {maxAge: 100000000*24, signed:true}).send('cookies')
});

router.get('/getCookies', (req, res) => {
    // console.log(req.cookies)
    console.log(req.signedCookies)
    
    // res.send(req.cookies)
    // cookie firmadas
    res.send(req.signedCookies)
});

router.get('/deletecookies', (req, res) => {
    
    res.clearCookie('coderCookie').send('delete cookies')
});

module.exports = router