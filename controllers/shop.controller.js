import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

export const getIndex = (req, res) => {
  Product.fetchAll()
    .then(({ rows, fields }) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Home Page",
        path: "/",
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getProducts = (req, res) => {
  Product.fetchAll()
    .then(({ rows, fields }) => {
      res.render("shop/products-list", {
        prods: rows,
        pageTitle: "Products Page",
        path: "/products",
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getProductDetails = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Product.findById(id)
    .then(({ rows }) => {
      const product = rows[0];
      res.render("shop/product-details", {
        product,
        pageTitle: product.title,
        path: `/products`,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getCart = (req, res, next) => {
  Cart.fetchCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

export const postCart = (req, res) => {
  const productId = req.body.productId;
  console.log(productId);

  Product.findById(productId, (product) => {
    Cart.addToCart(productId, product.price);
  });

  res.redirect("/cart");
};

export const postDeleteCartProduct = (req, res) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    Cart.deleteFromCart(productId, product.price);
  });

  res.redirect("/cart");
};

export const getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Orders Page",
    path: "/orders",
  });
};

export const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Cart Page",
    path: "/checkout",
  });
};
