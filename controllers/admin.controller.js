import { Product } from "../models/product.model.js";

export const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.delete(productId);

  res.redirect("/admin/products");
};

export const getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.render("/");
  }

  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  });
};

export const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    price,
    description
  );

  updatedProduct.save();
  res.redirect("/admin/products");
};

export const getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
