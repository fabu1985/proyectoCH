const { UserDto } = require("../dto/usersDto")

class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    getAll = async () => await this.dao.get()
    get = async (filter) => await this.dao.getBy(filter)
    create = async (newUser) =>{
        const newUserDto = new UserDto(newUser)
        return await this.dao.create(newUserDto)
    }
    update = async (uid, userToUpdate) => await this.dao.update(uid, userToUpdate);

    delete = async (uid) => await this.dao.delete(uid)
}

module.exports = {
    UserRepository
}