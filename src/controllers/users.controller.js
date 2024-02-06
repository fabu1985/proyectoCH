const UserDaoMongo = require("../dao/mongo/usersDaoMongo")

class UserController {
    constructor (){
        this.usersService = new UserDaoMongo()
    }
        getUsers = async (req, res) =>{
        // sinc o async ?
        try {
            const users = await this.usersService.getUsers()
            res.send(users)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    createUser = async (req, res) =>{
        try {
            const {first_name, last_name, email, password, role, atCreated} = req.body
            // validación
            const result = await this.usersService.createUser({
                first_name,
                last_name,
                email,
                password,
                role,
                atCreated
            })
            console.log(first_name, last_name, email)
            res.status(201).send({ 
                status: 'success',
                payload: result        
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    
    updateUser = async (req, res) =>{
    
        const { uid } = req.params
        const userToReplace = req.body
        // venga el id
        const result = await this.usersService.updateUser({_id: uid}, userToReplace)
        res.status(201).send({ 
            status: 'success',
            payload: result 
        })
    }
    
    deleteUser = async  (req, res)=> {
        const { uid } = req.params
    
        const result = await this.usersService.deleteUser({_id: uid})
        res.status(200).send({ 
            status: "success", 
            payload: result 
        })
    }
    }
    
    module.exports = UserController