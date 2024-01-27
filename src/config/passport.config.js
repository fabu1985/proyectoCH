const passport = require('passport')
const local    = require('passport-local')
const UserDaoMongo = require('../dao/mongo/usersDao.mongo.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')
const GitHubStrategy = require('passport-github2')

const LocalStrategy = local.Strategy
const userService   = new UserDaoMongo() 

exports.initializePassport = () => {
    passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.9efc6419a3177ebc',
    clientSecret: '08afdf2b6f4d964cdbaa4b91f1c0eee4af0404e8',
    callbackURL: 'http://localhost:4040/api/sessions/githubcallback'
}, async (accesToken, refreshToken, profile, done)=> {
    try {
        console.log(profile)
        let user = await userService.getUserBy({email: profile._json.email})
        if (!user) {
            // para registrar en caso de que no exista
            let userNew = {
                first_name: profile.username,
                last_name: profile.username,
                email: profile._json.email,
                password: '123456'
            }
            let result = await userService.createUser(userNew)
            return done(null, result)
        }
        done(null, user)

    } catch (error) {
        return done(error)
    }
}))

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const {first_name, last_name } = req.body
            let userFound = await userService.getUserBy({email: username})
            if(userFound) return done(null, false)

            let newUser = {
                first_name, 
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

        } catch (error) {
            return done('Error al crear un usuario: '+error)
        }
    })) 

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done)=>{
        let user = await userService.geUsertBy({_id: id})
        done(null, user)
    })
}