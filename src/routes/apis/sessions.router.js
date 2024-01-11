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
        req.session.first_name = 'fede' 
        res.send('Bienvenido a sessions')
    }
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
  const { email , password } = req.body
  // simulando consulta a la base de datos
  if (email === '' || password === '') {
      return res.send('todos los campos son obligatorios')
  }
  const user = await usersModel.findOne({email})
  if (!user) {
      return res.send('email inexistente')
  }
  if (password !== user.password) {
      return res.send('contraseña erronea')
  }
  req.session.user = {
      user: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      admin: true
  }
  res.redirect('/views/products?numPage=1')
});


router.get('/current', authentication, (req, res) => {
    res.send('info sensible que solo puede ver el admin')
})

  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.send({ status: 'error', error: err });
    });
    res.redirect('/');
  });
  

// cookies
router.get('/setcookies', (req, res) => {
    // cookie par key value 
    res.cookie('signedCookie', 'Esta es una cookie muy poderosa.', {maxAge: 100000000*24, signed:true}).send('cookies')
})

router.get('/getCookies', (req, res) => {
    // console.log(req.cookies)
    console.log(req.signedCookies)
    
    // res.send(req.cookies)
    // cookie firmadas
    res.send(req.signedCookies)
})

router.get('/deletecookies', (req, res) => {
    
    res.clearCookie('coderCookie').send('delete cookies')
})

module.exports = router
