const { usersService } = require("../repositories/index.js")
const CustomError = require("../services/errors/CustomError.js")
const { EErrors } = require("../services/errors/enum.js")
const { generateUserErrorInfo } = require("../services/errors/generateErrorInfo.js")
const { logger } = require("../utils/logger.js")

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
            logger.error(error)
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
            logger.info(newUser)
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
    
      // cambio de reoles para Desafio Complementario calse 37
  changeRole = async ( req, res) => {
    const {uid} = req.params
    try {
      const user = await this.service.getBy({_id: uid});
      if (!user) return res.sendNotFound('Usuario no encontrado');

      if (user.role == 'user') {
        user.role = 'premium';
        user.last_updated = new Date();
      } else if (user.role == 'premium') {
        user.role = 'user'
        user.last_updated = new Date();
      }
      const newuser = await this.service.update({_id: uid}, user);
      res.sendSuccess({
        _id: newuser._id,
        first_name: newuser.first_name,
        last_name: newuser.last_name,
        email: newuser.email,
        role: newuser.role,
        last_updated: newuser.last_updated
      });
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
}
  module.exports = UserController