const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOneUser = async (req, res) => {
  try {                 
    const user = await User.findById(req.body._id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
  
};

module.exports = {
  getAllUsers,
  getOneUser,
};
