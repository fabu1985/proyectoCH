const passport = require('passport')
const local    = require('passport-local')
const { usersModel } = require('../dao/mongo/models/ecommerce.model.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')
const UserDaoMongo = require('../dao/mongo/usersDao.mongo.js')
const GithubStrategy = require('passport-github2')

const LocalStrategy = local.Strategy
const userService = new UserDaoMongo()


exports.initializePassport = () => {
 // nueva estrategia
 passport.use('github', new GithubStrategy({
    clientID: 'Iv1.9efc6419a3177ebc',
    clientSecret: '08afdf2b6f4d964cdbaa4b91f1c0eee4af0404e8',
    callbackURL: 'http://localhost:4040/api/sessions/githubcallback'
 }, async (accesToken, refreshToken, profile, done) => {
    try{
        console.log(profile)
        let user = await userService.getUserBy({email: profile._json.email})
        if(!user){
         // para registrar en casso de q no exista   
         let userNew = {
            first_name: profile.username,
            last_name: profile.username,
            email: profile._json.email,
            password: ''
         }
         let result = await userService.createUser(userNew)
         return done(null, result)
        }
        done(null, user)

    }  catch (error) {
        return done(error)
    }
}))

///esto es para guardar y recuperar credencialaes del susuarion de sesession
passport.serializeUser((user,done)=> {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    let user = await userService.getUserBy({_id: id})
    done(null, user)
})
}