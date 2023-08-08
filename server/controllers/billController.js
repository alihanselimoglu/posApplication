const Bill = require("../models/Bill");

const getAllBills = async (req, res) => {
  try {
    const Bills = await Bill.find();
    res.status(200).json(Bills);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createBill = async (req, res) => {
  const newBill = new Bill(req.body);
  try {
    const savedBill = await newBill.save();
    res.status(200).json(savedBill);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneBill = async (req, res) => {
  try {
    const Bill = await Bill.findById(req.params.id);
    res.status(200).json(Bill);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllBills,
  createBill,
  getOneBill,
};
