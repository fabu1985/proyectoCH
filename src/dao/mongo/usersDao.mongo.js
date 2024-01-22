const { usersModel } = require("./models/ecommerce.model");

class UserDaoMongo {
    constructor() {
        this.model = usersModel;
    }

    getUsers = async () => await this.model.find({});
    
    getUser = async (uid) => await this.model.findOne({_id: uid});
    
    getUserBy = async (filter) => await this.model.findOne(filter);
    
    createUser = async (newUser) => await this.model.create(newUser);
    
    updateUser = async (uid, userUpdate) => await this.model.findOneAndUpdate({_id: uid}, userUpdate);
    
    deleteUser = async (uid) => await this.model.findOneAndDelete({_id: uid});
}

module.exports = UserDaoMongo;
