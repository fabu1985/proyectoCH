const fs = require('fs');

class CartManager {
  constructor(){
    this.carritos = [];
  }

  async createCart() {
    const savedCarts = await fs.promises.readFile('cart.json', 'utf-8');
    const savedCartsArray = JSON.parse(savedCarts);

    const id = savedCartsArray.length + 1
    const newCart = {
      id: id,
      products: []
    }
    savedCartsArray.push(newCart)
    const carritosString = JSON.stringify(savedCartsArray, null, 2);
    await fs.promises.writeFile('cart.json', carritosString);
  }

  async getCartById(id) {
    const savedCarts = await fs.promises.readFile('cart.json', 'utf-8');
    const savedCartsArray = JSON.parse(savedCarts);
    const foundedCart = savedCartsArray.find((x) => (x.id == id));
    return foundedCart.products;
  }

  async addProductToCart(cartId, productId) {
  const savedCarts = await fs.promises.writeFile('cart.json', 'utf-8');
  const savedCartsArray = JSON.parse(savedCarts);

  const foundedCartIndex = savedCartsArray.findIndex((x) => (x.id == cartId));

  if (foundedCartIndex !== -1) {
    const cartsCopy = [...savedCartsArray];
    const foundedCart = { ...savedCartsArray[foundedCartIndex] };

    const productIndex = foundedCart.products.findIndex((p) => parseInt(p.pid) === parseInt(productId));

    if (productIndex !== -1) {
      foundedCart.products[productIndex].quantity += 1;
    } else {
      foundedCart.products.push({ pid: parseInt(productId), quantity: 1 });
    }
    cartsCopy[foundedCartIndex] = foundedCart;

    const newList = JSON.stringify(cartsCopy, null, 2);
    await fs.promises.writeFile('cart.json', newList);
  }
  else {
    console.log(`No se encontró ningún carrito con el id: ${cartId}`)
  }
  }
}

module.exports = CartManager;