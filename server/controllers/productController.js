const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json(Products);
    } catch (err) {
        res.status(500).json(err);
    }
}

const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate({ _id: req.body._id }, req.body);
        const updatedProduct =  await Product.findById(req.body._id);
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body._id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}

const getOneProduct = async (req, res) => {
    try {
        const Product = await Product.findById(req.params.id);
        res.status(200).json(Product);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getOneProduct
}

