const Category = require("../models/category");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
}

const createCategory = async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate({ _id: req.body._id }, req.body);
        const updatedCategory =  await Category.findById(req.body._id);
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.body._id);
        res.status(200).json("Category has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}

