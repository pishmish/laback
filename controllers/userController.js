const { User } = require('../models/user');

const getAllUsersStatic = async (req, res) => {
    res.status(200).json({msg: "users testing route"})
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
        res.json(users);
      } else {
        res.status(404).json({ error: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


module.exports = {
    getAllUsers,
    getAllUsersStatic
}
