const express = require("express");
const router = express.Router();

const { getProducts, createProduct } = require("../controllers/productController")

const auth = require("../middlewares/auth");

router.get("/", auth, getProducts);
router.post("/", auth, createProduct);

module.exports = router;
