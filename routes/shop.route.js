import { Router } from "express";

import {
  getIndex,
  getProducts,
  getCart,
  getCheckout,
  getOrders,
  getProductDetails,
  postCart,
  postDeleteCartProduct,
} from "../controllers/shop.controller.js";

const router = Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:id", getProductDetails);

// CART
router.get("/cart", getCart);
router.post("/cart", postCart);

router.post("/delete-cart-item", postDeleteCartProduct);

router.get("/checkout", getCheckout);

router.get("/orders", getOrders);

export default router;
