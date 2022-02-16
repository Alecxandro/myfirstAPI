const router = require("express").Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  const { productName, quantity, price, avaible } = req.body;

  if (!productName || !quantity || !price || !avaible) {
    res.status(422).json({ error: "you must provide all required fields" });
  }

  const product = {
    productName,
    quantity,
    price,
    avaible,
  };

  try {
    await Product.create(product);
    res.status(201).json({ message: "product saved successfully" });
  } catch (error) {
    res.status(422).json({ error: `something went wrong ${error}` });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (erro) {}
});

router.get("/:product", async (req, res) => {
  const productName = req.params.product;

  try {
    const product = await Product.findOne({ productName: productName });
    if (!productName) {
      res.status(422).json({ error: "Product not found" });
      return;
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(422).json({ err: `${error.message}` });
  }
});

router.patch("/:product", async (req, res) => {
  const product = req.params.product;
  const { productName, quantity, price } = req.body;

  if (!productName || !quantity || !price) {
    res.status(422).json({ message: "You must provide all required fields!" });
    return;
  }

  const products = {
    productName,
    quantity,
    price,
  };

  try {
    const updateProduct = await Product.updateOne(
      { productName: product },
      products
    );
    res.status(200).json({ message: products });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.delete("/:product", async (req, res) => {
  const productN = req.params.product;
  
  const product = await Product.findOne({productName: productN});

  if (!product) {
    res.status(422).json({ message: "Product Not Found" });
    return;
  }

  try {
    await Product.deleteOne({ productName: productN });
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {res.status(400).json({ message: error.message})};
});

module.exports = router;
