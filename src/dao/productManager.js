const fs = require('fs');
const path =`./products.json`;

class ProductManager {
  constructor() {
    this.path = path
  }

  async getProducts() {
    const jsonProducts = await fs.promises.readFile('products.json', 'utf-8');
    const existantProductsArray = JSON.parse(jsonProducts);
    return existantProductsArray;
  }
  async addProduct(title, category, description, price, thumbnail, code, stock, status) {
    if(title != "" && description!= "" && category!= "" && price != null && code !== null && typeof code === 'string' && stock != null && typeof status === 'boolean'){
      let id = 0;
      for (let i = 0; i < this.products.length; i++) {
        const element = this.products[i];
        if(element.id > id) {
          id = element.id;
        }
      }
      id++;
      status = typeof status === 'boolean' ? status : true
      code = code;
      const codeAlready = this.products.some((x) => (x.code == code));
      if (codeAlready){
        console.error("Id product it´s already existant.");
        return;
      }

      this.products.push({id:id, title, category, description, price, thumbnail, code, stock, status})
      const stringProducts = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile('products.json', stringProducts);
    }else {
      console.log("Check your data.Invalid params");
    }
  }
  async getProductById(id) {
    const jsonProducts = await fs.promises.readFile('products.json', 'utf-8');
    const existantProductsArray = JSON.parse(jsonProducts);
    const foundedProduct = existantProductsArray.find((x) => (x.id == id));
    return foundedProduct;
  }
  async deleteProduct(id) {
    const jsonProducts = await fs.promises.readFile('products.json', 'utf-8');
    const existantProductsArray = JSON.parse(jsonProducts);
    const foundedProduct = existantProductsArray.find((x) => (x.id == id));
    if(!foundedProduct) {
      console.log(`Product id: ${id}! wasn´t found`)
      return;
    }
    const newProducts = existantProductsArray.filter(x => x.id != id);
    this.products = newProducts;
    const newProductsString = JSON.stringify(newProducts, null, 2)
    await fs.promises.writeFile('products.json', newProductsString);
  }
  async updateProduct(id, newTitle, newCategory, newDescription, newPrice, newThumbnail, newCode, newStock, newStatus) {
    const jsonProducts = await fs.promises.readFile('products.json', 'utf-8');
    const existantProductsArray = JSON.parse(jsonProducts);
    const foundedProduct = existantProductsArray.find((x) => (x.id == id));
    if(!foundedProduct) {
      console.log(`Product id: ${id}! wasn´t found`)
      return;
    }
    const newProducts = existantProductsArray.filter(x => x.id != id);
    if(newTitle != "" && newDescription!= "" && newPrice != null && newThumbnail!= "" && newStock != null){
      const updateStatus = typeof newStatus === 'boolean' ? newStatus : true;
      const productoActualizado = {
        id:id, 
        title: newTitle || foundedProduct.title,
        description: newDescription || foundedProduct.description,
        code: newCode || foundedProduct.code,
        price: newPrice || foundedProduct.price, 
        status: updateStatus,
        stock: newStock || foundedProduct.stock,
        category: newCategory || foundedProduct.category,
        thumbnail: newThumbnail || foundedProduct.thumbnail
      }
      if(foundedProduct.code != newCode) {
        const codeAlready = this.products.some((x) => (x.code == newCode));
        if (codeAlready){
          console.error("Id product it´s already existant.");
          return;
        }
      } 
      newProducts.push(productoActualizado);
      this.products = newProducts;
    } else {
      console.log("Entry valid data, please.");
      return;
    }
    const newProductsString = JSON.stringify(newProducts, null, 2)
    await fs.promises.writeFile('products.json', newProductsString);
  }
}

module.exports = ProductManager;
