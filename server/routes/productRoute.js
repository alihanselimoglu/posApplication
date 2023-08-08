const express = require("express");

const { getAllProducts, createProduct, updateProduct, deleteProduct, getOneProduct } = require("../controllers/productController");

const router = express.Router();


router.route("/").get(getAllProducts).post(createProduct);
router.route("/update").put(updateProduct);
router.route("/delete").delete(deleteProduct);







module.exports = router;