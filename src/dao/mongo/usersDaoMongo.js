const { usersModel } = require("./models/ecommerce.model");

class UserDaoMongo {
    constructor() {
        this.userModel  = usersModel;
    }

    getAll = async () => await this.userModel.find({});
    
    get = async (uid) => await this.userModel.findOne({_id: uid});
    
    getBy = async (filter) => await this.userModel.findOne(filter);
    
    create = async (newUser) => await this.userModel.create(newUser);
    
    update = async (uid, userToUpdate) => await this.userModel.findOneAndUpdate({_id: uid}, userToUpdate);
    
    delete = async (uid) => await this.userModel.findOneAndDelete({_id: uid});
}

module.exports = UserDaoMongo;