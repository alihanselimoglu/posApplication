const express = require("express");

const { getAllBills, createBill, getOneBill } = require("../controllers/billController");

const router = express.Router();


router.route("/").get(getAllBills).post(createBill);







module.exports = router;