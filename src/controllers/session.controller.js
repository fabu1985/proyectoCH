const { createHash, isValidPassword } = require('../utils/hashPassword')
const { cartService, usersService } = require('../repositories/index')
const { createToken } = require('../utils/jwt')

 class SessionController {
    constructor(){
        this.cartService = cartService
        this.usersService = usersService
    }

    register = async (req,res) =>{
        const { first_name, last_name, email , password } = req.body
        if (first_name ==='' || password === "" || email === '' ) {
            return res.send('completar datos requeridos')
        }
        const userFound = await this.usersService.get({email})
        if (userFound) {
            return res.send({status: 'error', error: 'existant user'})
        }
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        }
        const result = await this.usersService.create(newUser)
        const token = createToken({id:result._id})
        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true
          }).json({
            status: 'success',
            message: 'logged id'
           })
    }

    login = async (req,res) => {
        const { email , password } = req.body
        // simulando consulta a la base de datos
        if (email === '' || password === '') {
            return res.send('todos los campos son obligatorios')
        }
        const user = await this.usersService.get({email})
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
    }

    logout = async (req,res) =>{
          /*req.session.destroy((err) => {
    if (err) return res.send({ status: 'error', error: err });
  });
  res.send('logout exitoso')
  res.redirect('/');*/
        try{
            req.session.destroy((err) =>{
                if(err){
                    console.error('Error during session destruction:', err)
                    return res.status(500).send({ status: 'error', error: 'Internal Server Error' })
                }
    
                res.redirect('/login')
            })
        }catch(error) {
            console.error('Error during logout:', error)
            res.status(500).send({ status: 'error', error: 'Internal Server Error' })
        }
    }

    current = (req,res) => {
        if (req.user) {
            const { first_name, last_name, role } = req.user
            const userDTO = {
                first_name: first_name,
                last_name: last_name,
                role: role
            }
            res.json(userDTO)
        } else {
            res.status(401).json({ error: "Unauthorized" })
        }
    }

    github = async (req,res)=>{}

    faillogin = async (req,res)=>{
        res.send({error: 'failed login'})
    }

    githubCallback = (req, res) => {
        req.session.user = req.user
        res.redirect('/login')
    }
}

module.exports = SessionController