const { userModel } = require("./models/ecommerce.model")

class UserDaoMongo {
    constructor(){
        this.model = userModel
    }
    async getUsers(){
        try {
            return await this.model.find({})   
        } catch (error) {
            console.log(error)
        }
    }
    async getUser(uid){
        return await this.model.findOne({_id: uid})
    }
    async getUserBy(filter){
        return await this.model.findOne(filter)
    }
    async createUser(newUser){
        return await this.model.create(newUser)
    }
    async updateUser(uid){}
    async deleteUser(uid){}
}

module.exports = UserDaoMongo
