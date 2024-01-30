const { Router } = require('express');
const { authentication } = require('../middlewares/auth.middleware');
const { usersModel } = require('../dao/mongo/models/ecommerce.model');
const { createHash, isValidPassword } = require('../utils/hashPassword');
const passport = require('passport');
const { createToken, authenticationToken } = require('../utils/jwt');
const { passportCall } = require('../utils/passportCall');
const { authorizationJwt } = require('../middlewares/jwtPassport.middleware');

const router = Router();

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
        password: createHash(password)
    }
    const result = await usersModel.create(newUser)
    const token = createToken({id:result._id})
    res.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true,
        //secure:true,
        //sameSite: 'none'
      }).json({
        status: 'success',
        message: 'logged id'
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
    if (!isValidPassword (password, {password: user.password})) {
      return res.send('email o contraseña erroneas')
  }
  const token = createToken({id:user._id, role: 'user'})
  res.cookie('token', token, {
    maxAge: 60 * 60 * 1000 * 24,
    httpOnly: true,
    //secure:true,
    //sameSite: 'none'
  }).json({
    status: 'success',
    message: 'logged id',
    payload: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name
    }
   })
})

router.get('/failregister', (req, res) => {
    console.log('Fail strategy')
    res.send({status: 'error', error: 'Fialed'})
})

router.get('/faillogin', (req, res) => {
    res.send({error: 'failed login'})
})

router.get('/current', passportCall('jwt'), authorizationJwt('user'), (req, res)=>{
    res.send({message: 'datos sensibles', reqUser: req.user})
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.send({ status: 'error', error: err });
    });
    res.send('logout exitoso')
    res.redirect('/');
  });
module.exports = router