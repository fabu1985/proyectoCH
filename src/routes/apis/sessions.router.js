const {Router } = require('express');
const { authentication } = require('../../middlewares/auth.middleware');
const { usersModel } = require('../../dao/mongo/models/ecommerce.model');
const { createHash, isValidPassword } = require('../../utils/hashPassword');
const passport = require('passport');


const router = Router();

// routes de passoport
router.post('/register', passport.authenticate('register', {failregister: '/api/sessions/failregister'}))
router.post('/register', async (req, res)=>{
    console.log('Fail strategy')
    res.send({status: 'error', error: 'Failed'})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessiones/faillogin'}), async (req, res) => {
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
}) 

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.send({ status: 'error', error: err });
    });
    res.redirect('/');
  });
module.exports = router
