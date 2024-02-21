const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = "./mockDB/products.json";
        this.products = [];
        this.load();
    }

    async load() {
        try {
          const productsInJson = await fs.promises.readFile(this.path, "utf-8");
          this.products = JSON.parse(productsInJson);
        } catch (error) {
          console.error("Error loading products:", error);
        }
    }

    async writeOnFile() {
        try {
          const productsJson = JSON.stringify(this.products, null, 2);
          await fs.promises.writeFile(this.path, productsJson);
        } catch (error) {
          console.error("Error writing products to file:", error);
        }
    }

    async create(title, description, price, thumbnail, code, stock, status, category) {

        let id = 0;
        for (let i = 0; i < this.products.length; i++) {
            const element = this.products[i];
            if(element.id > id){
                id = element.id;
            }
        }
        id++;

        if(this.products.find(product => product.code === code)){
            console.log("This product has already been added");
        }
        else{
            if(!title || !description || !price || !code || !stock){
                console.log("Incorrect product: One of these properties is not valid");
            }
            else{
                this.products.push({id: id, title, description, price, thumbnail, code, stock, status, category});
                await this.writeOnFile()
            }
        }
    }

    async getAll() {

        return this.products
    }

    async getLimitedProducts(limit) {

        if (parseInt(limit) <= 0) {
            console.log("Invalid limit");
            return [];
        } else {
            return this.products.slice(0, parseInt(limit));
        }
    }

    async getProductById(id) {

        const filteredProduct = this.products.filter(product => product.id === parseInt(id));
        if(filteredProduct.length !== 0){
            return filteredProduct;
        }
        else{
            console.log("This product does not exist");
            return [];
        }
        
    }

    async getProductBy(filter) {
        try {
            const filteredProduct = await this.readFile();
            return this.products.find(product => product.id === parseInt(filter));
        } catch (error) {
            return new Error(error);
        }
    }

    async update(id, title, description, price, thumbnail, code, stock, status, category){
        const existingProductIndex = this.products.findIndex(product => product.id === parseInt(id));

    if (existingProductIndex !== -1) {
        this.products[existingProductIndex] = {
            ...this.products[existingProductIndex],
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        };

        await this.writeOnFile();
        }
        else{
            console.log("The product to be updated was not found")
        }
    }

    async delete(id){
        const indexToDelete = this.products.findIndex((product)=> product.id === parseInt(id));
        if(indexToDelete!==-1){
            this.products.splice(indexToDelete, 1);
            await this.writeOnFile();
        }else{
            console.log('No such product exists')
        }
    }
}

module.exports = ProductManager;