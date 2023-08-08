const express = require("express");

const { getAllUsers, getOneUser } = require("../controllers/userController");

const router = express.Router();


router.route("/all").get(getAllUsers);
router.route("/").get(getOneUser);







module.exports = router;