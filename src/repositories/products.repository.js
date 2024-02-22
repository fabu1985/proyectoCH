// podemos llamar a los dto

class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    getAll   = async () => await this.dao.get()
    get    = async (filter) => await this.dao.getBy(filter)
    create = async (newProduct) => await this.dao.create(newProduct)
    update = async (pid, productToUpdate) => await this.dao.update(pid, productToUpdate)
    delete = async (pid) => await this.dao.delete(pid)

}

module.exports = ProductRepository