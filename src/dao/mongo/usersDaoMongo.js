const { usersModel } = require("./models/ecommerce.model");

class UserDaoMongo {
    constructor() {
        this.model  = usersModel;
    }

    getAll = async () => await this.model.find({});
    
    get = async (uid) => await this.model.findOne({_id: uid});
    
    getBy = async (filter) => await this.model.findOne(filter);
    
    create = async (newUser) => await this.model.create(newUser);
    
    update = async (uid, userToUpdate) => await this.model.findOneAndUpdate({_id: uid}, userToUpdate);
    
    delete = async (uid) => await this.model.findOneAndDelete({_id: uid});
}

module.exports = UserDaoMongo;