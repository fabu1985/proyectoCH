const { usersService } = require("../repositories/index.js")
const CustomError = require("../services/errors/CustomError.js")
const { EErrors } = require("../services/errors/enum.js")
const { generateUserErrorInfo } = require("../services/errors/generateErrorInfo.js")

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
    

    create = async (req, res, next) =>{
        try {
            const {first_name, last_name, email, password, role, atCreated} = req.body
            // validación
            if(!first_name || !last_name || !email){
                CustomError.createError({
                    name: 'Error trying to create an User',
                    cause: generateUserErrorInfo({first_name, last_name, email}),
                    message: 'Make sure that you put all the required data',
                    code: EErrors.INVALID_TYPES_ERROR

                })
            }
            const newUser = {first_name, last_name, email, password, role, atCreated}
            console.log(newUser)
            const result = await this.usersService.create(newUser)
            res.status(201).send({ 
                status: 'success',
                payload: result        
            })
        } catch (error) {
            next(error)
        }
        
    }
    
    update = async (req, res, next) =>{
        try {
        const { uid } = req.params
        const {first_name, last_name, email} = req.body
        // venga el id
        const result = await this.usersService.update({_id: uid}, {first_name, last_name, email})
        if(!first_name || !last_name || !email){
            CustomError.createError({
                name: 'Error trying to update an User',
                cause: generateUserErrorInfo({first_name, last_name, email}),
                message: 'Make sure that you put all the required data',
                code: EErrors.INVALID_TYPES_ERROR

            })
        }
        res.status(201).send({ 
            status: 'success',
            payload: result 
        })}
        catch (error) {
            next(error)
        }
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