const { usersService } = require("../repositories/index.js")

class UserController {
    constructor (){
        this.usersService = usersService
    }

        getAll = async (req, res) =>{
        // sinc o async ?
        try {
            const users = await this.usersService.getAll()
            res.send(users)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    create = async (req, res) =>{
        try {
            const {first_name, last_name, email, password, role, atCreated} = req.body
            // validación
            const newUser = {first_name, last_name, email, password, role, atCreated}
            console.log(newUser)
            const result = await this.usersService.create(newUser)
            res.status(201).send({ 
                status: 'success',
                payload: result        
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    
    update = async (req, res) =>{
    
        const { uid } = req.params
        const userToReplace = req.body
        // venga el id
        const result = await this.usersService.update({_id: uid}, userToReplace)
        res.status(201).send({ 
            status: 'success',
            payload: result 
        })
    }
    
    delete = async  (req, res)=> {
        const { uid } = req.params
    
        const result = await this.usersService.delete({_id: uid})
        res.status(200).send({ 
            status: "success", 
            payload: result 
        })
    }
    }
    
    module.exports = UserController