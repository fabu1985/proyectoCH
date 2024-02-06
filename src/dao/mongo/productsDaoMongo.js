const { productsModel } = require("./models/ecommerce.model")

class ProductDaoMongo {
    constructor(){
        this.model = productsModel
    }

    getProducts = async () => await this.model.find({});
    
    getProduct = async (pid) => await this.model.findById({_id: pid});
        
    createProduct = async (newProduct) => await this.model.create(newProduct);
    
    updateProduct = async (pid, productUpdate) => await this.model.findOneAndUpdate({_id: pid, productUpdate});
    
    deleteProduct = async (pid) => await this.model.findOneAndDelete({_id: pid});
}

module.exports = ProductDaoMongo