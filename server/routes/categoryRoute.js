const express = require("express");

const { getAllCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");

const router = express.Router();


router.route("/").get(getAllCategories).post(createCategory);
router.route("/update").put(updateCategory);
router.route("/delete").delete(deleteCategory);







module.exports = router;