const { Router } = require('express');
const { authentication } = require('../../middlewares/auth.middleware');
const { usersModel } = require('../../dao/mongo/models/users.model');
const { createHash, isValidPassword } = require('../../utils/hashPassword');
const passport = require('passport');
const { createToken, authenticationToken } = require('../../utils/jwt');
const { passportCall } = require('../../utils/passportCall');
const { authorizationJwt } = require('../../middlewares/jwtPassport.middleware');
const SessionController = require('../../controllers/session.controller')

const router = Router();

const {
  register,
  login,
  logout,
  current,
  github,
  githubCallback,
  faillogin
} = new SessionController()

router.post('/register', register);

router.post('/login', login)

router.get('/logout', logout)

router.get('/faillogin', faillogin)

router.get('/current', [passportCall('jwt'), authentication(['USER','ADMIN'])], current)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), github)

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), githubCallback)


module.exports = router