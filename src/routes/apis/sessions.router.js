const {Router } = require('express');
const { authentication } = require('../../middlewares/auth.middleware');
const { usersModel } = require('../../dao/mongo/models/ecommerce.model');
const { createHash, isValidPassword } = require('../../utils/hashPassword');
const passport = require('passport');
const { createToken, authenticationToken } = require('../../utils/jwt');


const router = Router();

///////// estrategia uno
// routes de passoport
/* router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}),(req, res)=>{
    res.json({status: 'success', message: 'user created'})
}) */ 

// este anda con el crypt
 
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
   res.send({
       status: 'success',
       payload: {
           first_name: result.first_name,
           last_name: result.last_name,
           email: result.email,
           _id: result._id
       },
       token
   })
  });


/* router.get('/failregister', async (req, res)=>{
    console.log('Fail strategy')
    res.send({status: 'error', error: 'Failed'})
}) */ 

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
    if (!password == user.password) {
        return res.send('contraseña erronea')
    }
    if (!isValidPassword (password, {password: user.password})) {
      return res.send('email o contraseña erroneas')
  }
  const token = createToken({id:user._id, role: user.role})

    // req.session.user = {
     //    user: user._id,
     //    first_name: user.first_name,
     //    last_name: user.last_name,
     //    email: user.email,
     //    admin: true
    // }
    
    res.json({
        status: 'success',
        payload: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name
        },
        token
    })
    //res.redirect('/views/products?numPage=1')
  });

/* router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'invalid credential'})
    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name
    }
    res.send({status: 'success', message: 'login success'})
}) */ 

router.get('/faillogin', (req, res) => {
    res.send({error: 'failed login'})
})

router.get('/current', authenticationToken, (req, res) => {
    res.send('info sensible que solo puede ver el admin')
})
///////////////////////////////////
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req,res)=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),(req,res)=> {
    req.session.user = req.user
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.send({ status: 'error', error: err });
    });
    res.send('logout exitoso');
    res.redirect('/');
  });

module.exports = router
