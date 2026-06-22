import pool from "../utils/db.js";
import { Cart } from "./cart.model.js";

export class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return pool.query(
      "INSERT INTO products (title,price,description,image_url) VALUES($1, $2, $3, $4)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return pool.query("SELECT * FROM products");
  }

  static findById(id) {
    return pool.query("SELECT * FROM products WHERE id = $1", [id]);
  }
}
