const {Router } = require('express');
const { authentication } = require('../../middlewares/auth.middleware');
const { usersModel } = require('../../dao/mongo/models/ecommerce.model');
const { createHash, isValidPassword } = require('../../utils/hashPassword');
const passport = require('passport');


const router = Router();

/*
// routes de passoport
router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}),(req, res)=>{
    res.json({status: 'success', message: 'user created'})
})

// este anda con el crypt
 
// router.post('/register', async (req, res)=>{
 //   const { first_name, last_name, email , password } = req.body
 //   if (first_name ==='' || password === "" || email === '' ) {
 //       return res.send('completar datos requeridos')
 //   }
 //   const userFound = await usersModel.findOne({email})
 //   if (userFound) {
 //       return res.send({status: 'error', error: 'existant user'})
 //   }
 //   const newUser = {
 //       first_name,
 //       last_name,
 //       email,
 //       password: createHash(password)
 //   }
   // const result = await usersModel.create(newUser)
  
   // res.send({
  //      status: 'success',
  //      payload: {
  //          first_name: result.first_name,
  //          last_name: result.last_name,
  //          email: result.email,
  //          _id: result._id
  //      }
  //  })
  // });


router.get('/failregister', async (req, res)=>{
    console.log('Fail strategy')
    res.send({status: 'error', error: 'Failed'})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: 'error', error: 'invalid credential'})
    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name
    }
    res.send({status: 'success', message: 'login success'})
})

router.get('/faillogin', (req, res) => {
    res.send({error: 'failed login'})
})

router.get('/current', authentication, (req, res) => {
    res.send('info sensible que solo puede ver el admin')
}) */
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

  router.get('/current', authentication, (req, res) => {
    res.send('info sensible que solo puede ver el admin')
})
module.exports = router
