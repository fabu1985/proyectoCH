const Router = require('./router.js')
const { usersClassModel } = require('../dao/mongo/models/ecommerce.model.js')

class UsersRouter extends Router {
    init(){
        this.get('/', ['USER'], async (req,res)=>{
            try{
                const users = 'users'
                if(!users) return res.sendUserError('user not found nuevo coso')
                res.sendSuccess(users)
            } catch (error) {
                res.sendServerError(error)   
            }
    })
        this.post('/', ['ADMIN'], (req,res)=>{
            const result = 'users created'
            res.sendSuccess(result) 
        })
        this.put('/:pid', (req,res)=>{
            res.send('put users ok')
        })
        this.delete('/:pid', (req,res)=>{
            res.send('delete users ok')
        })
    }
}
module.exports = UsersRouter