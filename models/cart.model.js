// @ts-nocheck
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const p = path.join(__dirname, "../data/cart.json");

export class Cart {
  static addToCart(id, productPrice) {
    // Fetch the previous cart
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id,
          qty: 1,
        };

        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteFromCart(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      const cart = { ...JSON.parse(fileContent) };
      const product = cart.products.find((p) => p.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;

      cart.products = cart.products.filter((p) => p.id !== id);
      cart.totalPrice = cart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }
}
