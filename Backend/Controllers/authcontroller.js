const authServices = require('../Services/authServices')

exports.register = async (req, res) => {
  try {
    const data = await authServices.registerUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authServices.loginUser(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};