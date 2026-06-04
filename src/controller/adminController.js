const User = require("../model/user");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "name", "email", "role", "createdAt"],
  });
  res.json(users);
};
